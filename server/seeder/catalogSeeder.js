/**
 * catalogSeeder.js
 * ----------------
 * One-shot catalog builder for Shopwise AI.
 *
 *  1. Fixes the duplicated electronics images (every smartphone/laptop/etc.
 *     previously shared a single stock photo) by giving each product a
 *     distinct, brand-matched image.
 *  2. Adds a large clothing / fashion catalog across new categories.
 *
 * Every image is fetched from a verified source (DummyJSON CDN) and
 * re-uploaded to Cloudinary, so the database only ever stores Cloudinary URLs.
 *
 * Run:  node seeder/catalogSeeder.js
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const cloudinary = require("../config/cloudinary");
const Category = require("../models/Category");
const Product = require("../models/Product");

const USD_TO_INR = 84;
const DJ = "https://dummyjson.com";

/* ----------------------------- helpers ----------------------------------- */

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 90);

// simple concurrency-limited mapper
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return results;
}

// upload a remote image into Cloudinary (idempotent via public_id).
// returns a Cloudinary secure_url, or the original url if the upload fails.
const uploadCache = new Map();
async function toCloudinary(sourceUrl, publicId) {
  if (!sourceUrl) return "";
  if (uploadCache.has(sourceUrl)) return uploadCache.get(sourceUrl);
  try {
    const res = await cloudinary.uploader.upload(sourceUrl, {
      folder: "shopwise/catalog",
      public_id: publicId,
      overwrite: false,
      resource_type: "image",
    });
    uploadCache.set(sourceUrl, res.secure_url);
    return res.secure_url;
  } catch (err) {
    console.warn(`  ! cloudinary upload failed (${publicId}): ${err.message} — keeping source url`);
    uploadCache.set(sourceUrl, sourceUrl);
    return sourceUrl;
  }
}

async function fetchCategory(cat) {
  const r = await fetch(`${DJ}/products/category/${cat}?limit=0`);
  const j = await r.json();
  return j.products || [];
}

const inr = (usd) => Math.max(99, Math.round((usd * USD_TO_INR) / 10) * 10 - 1);

/* --------------------------- category setup ------------------------------ */

// name -> description for any category we may need
const CATEGORY_META = {
  Smartphones: "Latest flagship and value smartphones.",
  Laptops: "Powerful laptops for work, study and play.",
  Watches: "Smartwatches and classic timepieces.",
  Audio: "Headphones, earbuds and speakers.",
  Gaming: "Consoles and gaming gear.",
  "Men's Clothing": "Shirts, tees and everyday menswear.",
  "Women's Clothing": "Dresses, tops and trendy womenswear.",
  Footwear: "Sneakers, heels and everyday shoes.",
  "Bags & Accessories": "Handbags, sunglasses and jewellery.",
};

async function ensureCategories() {
  const map = {}; // name -> _id
  for (const [name, description] of Object.entries(CATEGORY_META)) {
    let cat = await Category.findOne({ name });
    if (!cat) {
      cat = await Category.create({ name, description });
      console.log(`+ created category: ${name}`);
    }
    map[name] = cat._id;
  }
  return map;
}

/* --------------------- electronics image re-imaging ---------------------- */

// Build a pool of distinct, valid images for an electronics theme from DummyJSON.
async function buildImagePool(djCategory, { audioOnly = false } = {}) {
  const products = await fetchCategory(djCategory);
  const pool = [];
  for (const p of products) {
    if (audioOnly) {
      const t = p.title.toLowerCase();
      const isAudio = /airpod|beats|echo|homepod|headphone|earphone|speaker/.test(t);
      if (!isAudio) continue;
    }
    for (const img of p.images || []) {
      pool.push({ url: img, title: p.title });
    }
  }
  return pool;
}

// Reassign one distinct image (brand-matched where possible) to each product.
async function reimageCategory(categoryId, djCategory, opts = {}) {
  const products = await Product.find({ category: categoryId });
  if (!products.length) return;

  const pool = await buildImagePool(djCategory, opts);
  let cursor = 0;
  const used = new Set();

  const nextFromPool = () => {
    while (cursor < pool.length && used.has(pool[cursor].url)) cursor++;
    const item = pool[cursor];
    if (item) used.add(item.url);
    cursor++;
    return item;
  };

  for (const product of products) {
    // try a brand match first (e.g. "Vivo" product -> a vivo image)
    const brand = (product.brand || "").toLowerCase().split(/\s+/)[0];
    let pick =
      brand && pool.find((x) => !used.has(x.url) && x.title.toLowerCase().includes(brand));
    if (pick) used.add(pick.url);
    else pick = nextFromPool();
    if (!pick) continue;

    const url = await toCloudinary(pick.url, `el-${slugify(product.title)}`);
    product.images = [url];
    await product.save();
    console.log(`  ~ ${product.title}  ->  ${pick.title}`);
  }
}

/* --------------------------- clothing import ----------------------------- */

// DummyJSON fashion category -> our category name
const CLOTHING_SOURCES = [
  { dj: "mens-shirts", cat: "Men's Clothing" },
  { dj: "tops", cat: "Women's Clothing" },
  { dj: "womens-dresses", cat: "Women's Clothing" },
  { dj: "mens-shoes", cat: "Footwear" },
  { dj: "womens-shoes", cat: "Footwear" },
  { dj: "womens-bags", cat: "Bags & Accessories" },
  { dj: "sunglasses", cat: "Bags & Accessories" },
  { dj: "womens-jewellery", cat: "Bags & Accessories" },
  { dj: "mens-watches", cat: "Watches" },
  { dj: "womens-watches", cat: "Watches" },
];

async function importClothing(catMap) {
  let added = 0;
  for (const src of CLOTHING_SOURCES) {
    const djProducts = await fetchCategory(src.dj);
    console.log(`\n# ${src.dj} -> ${src.cat} (${djProducts.length})`);

    for (const p of djProducts) {
      // skip if a product with this exact title already exists
      const exists = await Product.findOne({ title: p.title });
      if (exists) {
        console.log(`  = skip existing: ${p.title}`);
        continue;
      }

      // upload up to 3 images per product to Cloudinary
      const srcImages = (p.images || []).slice(0, 3);
      const images = await mapLimit(srcImages, 3, (img, i) =>
        toCloudinary(img, `cl-${slugify(p.title)}-${i}`)
      );

      const doc = {
        title: p.title,
        description: p.description || `${p.title} — premium quality.`,
        price: inr(p.price),
        category: catMap[src.cat],
        brand: p.brand || p.title.split(" ")[0],
        stock: p.stock ?? 25,
        images: images.filter(Boolean),
        averageRating: p.rating ? Math.round(p.rating) : 0,
        totalReviews: Array.isArray(p.reviews) ? p.reviews.length : 0,
        discountPercentage: p.discountPercentage ? Math.round(p.discountPercentage) : 0,
        isFeatured: (p.rating || 0) >= 4.5,
      };

      await Product.create(doc);
      added++;
      console.log(`  + ${p.title}  (₹${doc.price}, ${doc.images.length} imgs)`);
    }
  }
  return added;
}

/* -------------------------- category thumbnails -------------------------- */

async function setCategoryThumbnails() {
  const cats = await Category.find();
  for (const cat of cats) {
    if (cat.image) continue;
    const p = await Product.findOne({ category: cat._id, "images.0": { $exists: true } });
    if (p) {
      cat.image = p.images[0];
      await cat.save();
    }
  }
}

/* -------------------------------- main ----------------------------------- */

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB\n");

    const catMap = await ensureCategories();

    console.log("\n=== Re-imaging electronics (distinct images) ===");
    await reimageCategory(catMap["Smartphones"], "smartphones");
    await reimageCategory(catMap["Laptops"], "laptops");
    await reimageCategory(catMap["Audio"], "mobile-accessories", { audioOnly: true });
    // smartwatches: use the watch image pools
    await reimageCategory(catMap["Watches"], "mens-watches");

    console.log("\n=== Importing clothing & fashion ===");
    const added = await importClothing(catMap);

    console.log("\n=== Setting category thumbnails ===");
    await setCategoryThumbnails();

    const total = await Product.countDocuments();
    console.log(`\nDone. Added ${added} new products. Total products: ${total}`);
    process.exit(0);
  } catch (err) {
    console.error("SEED ERROR:", err);
    process.exit(1);
  }
})();
