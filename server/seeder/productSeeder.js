const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("../models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const products = [{
  title: "Vivo X200 Pro",
  description: "Camera focused flagship smartphone",
  price: 84999,
  brand: "Vivo",
  category: "6a23bc746ea2447bdaa716e1",
  stock: 20,
  images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"]
},

{
  title: "Oppo Find X8 Pro",
  description: "Premium smartphone with fast charging",
  price: 79999,
  brand: "Oppo",
  category: "6a23bc746ea2447bdaa716e1",
  stock: 16,
  images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"]
},

{
  title: "Realme GT 7 Pro",
  description: "Performance focused smartphone",
  price: 49999,
  brand: "Realme",
  category: "6a23bc746ea2447bdaa716e1",
  stock: 28,
  images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"]
},

{
  title: "Motorola Edge 60 Ultra",
  description: "Premium Motorola smartphone",
  price: 64999,
  brand: "Motorola",
  category: "6a23bc746ea2447bdaa716e1",
  stock: 19,
  images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"]
},

{
  title: "Lenovo ThinkPad X1 Carbon",
  description: "Business class productivity laptop",
  price: 159999,
  brand: "Lenovo",
  category: "6a258002e8210754c3f4fac2",
  stock: 14,
  images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"]
},

{
  title: "ASUS Zenbook 14",
  description: "Compact premium laptop",
  price: 99999,
  brand: "ASUS",
  category: "6a258002e8210754c3f4fac2",
  stock: 20,
  images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"]
},

{
  title: "Acer Swift Go",
  description: "Affordable productivity laptop",
  price: 74999,
  brand: "Acer",
  category: "6a258002e8210754c3f4fac2",
  stock: 18,
  images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"]
},

{
  title: "MSI Prestige 16",
  description: "Creator focused premium laptop",
  price: 169999,
  brand: "MSI",
  category: "6a258002e8210754c3f4fac2",
  stock: 8,
  images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"]
},

{
  title: "Samsung Galaxy Book 5",
  description: "Premium ecosystem laptop",
  price: 119999,
  brand: "Samsung",
  category: "6a258002e8210754c3f4fac2",
  stock: 16,
  images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"]
},

{
  title: "Fitbit Sense 3",
  description: "Health focused smartwatch",
  price: 24999,
  brand: "Fitbit",
  category: "6a258027e8210754c3f4fac3",
  stock: 20,
  images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12"]
},

{
  title: "Huawei Watch GT 5",
  description: "Long battery life smartwatch",
  price: 19999,
  brand: "Huawei",
  category: "6a258027e8210754c3f4fac3",
  stock: 25,
  images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12"]
},

{
  title: "Amazfit Balance",
  description: "Fitness and health tracking smartwatch",
  price: 14999,
  brand: "Amazfit",
  category: "6a258027e8210754c3f4fac3",
  stock: 35,
  images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12"]
},

{
  title: "Bose QuietComfort Ultra",
  description: "Premium immersive audio headphones",
  price: 34999,
  brand: "Bose",
  category: "6a25802de8210754c3f4fac4",
  stock: 22,
  images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"]
},

{
  title: "JBL Live Pro 2",
  description: "Wireless earbuds with ANC",
  price: 14999,
  brand: "JBL",
  category: "6a25802de8210754c3f4fac4",
  stock: 45,
  images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"]
},

{
  title: "Boat Nirvana X",
  description: "Affordable wireless earbuds",
  price: 4999,
  brand: "Boat",
  category: "6a25802de8210754c3f4fac4",
  stock: 80,
  images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"]
},

{
  title: "Nintendo Switch OLED",
  description: "Portable gaming console",
  price: 32999,
  brand: "Nintendo",
  category: "6a258226f4ac105d65063e18",
  stock: 40,
  images: ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3"]
},

{
  title: "ASUS ROG Ally X",
  description: "Handheld gaming PC",
  price: 69999,
  brand: "ASUS",
  category: "6a258226f4ac105d65063e18",
  stock: 15,
  images: ["https://images.unsplash.com/photo-1593305841991-05c297ba4575"]
},

{
  title: "Logitech G Pro X",
  description: "Professional gaming headset",
  price: 12999,
  brand: "Logitech",
  category: "6a258226f4ac105d65063e18",
  stock: 35,
  images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b"]
},
    {
  title: "OnePlus 13",
  description: "Flagship OnePlus smartphone",
  price: 69999,
  brand: "OnePlus",
  category: "6a23bc746ea2447bdaa716e1",
  stock: 25,
  images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"]
},

{
  title: "Google Pixel 9 Pro",
  description: "AI powered smartphone with exceptional camera",
  price: 99999,
  brand: "Google",
  category: "6a23bc746ea2447bdaa716e1",
  stock: 18,
  images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"]
},

{
  title: "Nothing Phone 3",
  description: "Unique transparent design smartphone",
  price: 54999,
  brand: "Nothing",
  category: "6a23bc746ea2447bdaa716e1",
  stock: 30,
  images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"]
},

{
  title: "MacBook Pro M4",
  description: "Professional Apple laptop with M4 chip",
  price: 199999,
  brand: "Apple",
  category: "6a258002e8210754c3f4fac2",
  stock: 10,
  images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"]
},

{
  title: "Dell XPS 15",
  description: "Premium Windows ultrabook",
  price: 149999,
  brand: "Dell",
  category: "6a258002e8210754c3f4fac2",
  stock: 12,
  images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"]
},

{
  title: "HP Spectre x360",
  description: "Convertible premium laptop",
  price: 139999,
  brand: "HP",
  category: "6a258002e8210754c3f4fac2",
  stock: 11,
  images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"]
},

{
  title: "Apple Watch Ultra 2",
  description: "Rugged premium smartwatch",
  price: 89999,
  brand: "Apple",
  category: "6a258027e8210754c3f4fac3",
  stock: 12,
  images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12"]
},

{
  title: "Garmin Fenix 8",
  description: "Outdoor adventure smartwatch",
  price: 79999,
  brand: "Garmin",
  category: "6a258027e8210754c3f4fac3",
  stock: 10,
  images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12"]
},

{
  title: "AirPods Pro 2",
  description: "Premium Apple wireless earbuds",
  price: 24999,
  brand: "Apple",
  category: "6a25802de8210754c3f4fac4",
  stock: 40,
  images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"]
},

{
  title: "Sony WH-1000XM5",
  description: "Industry leading noise cancellation",
  price: 29999,
  brand: "Sony",
  category: "6a25802de8210754c3f4fac4",
  stock: 35,
  images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"]
},

{
  title: "PlayStation 5",
  description: "Next generation gaming console",
  price: 54999,
  brand: "Sony",
  category: "6a258226f4ac105d65063e18",
  stock: 30,
  images: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db"]
},

{
  title: "Xbox Series X",
  description: "Powerful Microsoft gaming console",
  price: 52999,
  brand: "Microsoft",
  category: "6a258226f4ac105d65063e18",
  stock: 25,
  images: ["https://images.unsplash.com/photo-1621259182978-fbf93132d53d"]
}];

const seedProducts = async () => {

  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Added");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }

};

seedProducts();