import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ShoppingBag, ImageOff, Minus, Plus, Trash2, Lock, ArrowRight } from "lucide-react";
import api from "../../api/axios";
import useDocumentTitle from "../../lib/useDocumentTitle";

function Cart() {
  useDocumentTitle("Your Cart · Shopwise AI");
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data.cart);
    } catch (error) {
      toast.error("Could not load your cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setLoading(false);
      return;
    }
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1 || updating) return;
    setUpdating(true);
    try {
      await api.put(`/cart/update/${productId}`, { quantity });
      await fetchCart(); // refresh state — no full page reload
    } catch (error) {
      toast.error("Couldn't update quantity");
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId) => {
    if (updating) return;
    setUpdating(true);
    try {
      await api.delete(`/cart/remove/${productId}`);
      await fetchCart();
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Couldn't remove item");
    } finally {
      setUpdating(false);
    }
  };

  const total =
    cart?.items?.reduce(
      (total, item) => total + item.product?.price * item.quantity,
      0,
    ) || 0;

  const itemCount = cart?.items?.length || 0;

  return (
    <div className="container section-sm">
      <div className="eyebrow">Shopping Cart</div>
      <h1 className="display-md mb-32">
        My Cart{" "}
        <span
          style={{ fontSize: "18px", color: "var(--muted)", fontWeight: 400 }}
        >
          ({itemCount} items)
        </span>
      </h1>

      {loading ? (
        <div className="text-muted">Loading…</div>
      ) : itemCount === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <ShoppingBag size={36} strokeWidth={1.6} />
          </div>
          <h2 className="heading mb-8">Your cart is empty</h2>
          <p className="text-muted mb-24">
            Browse products and add items to your cart.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/products")}>
            Start shopping
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              {cart.items.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-img">
                    {item.product?.images?.[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product?.title}
                      />
                    ) : (
                      <ImageOff size={28} strokeWidth={1.5} />
                    )}
                  </div>
                  <div>
                    <div className="cart-item-name">{item.product?.title}</div>
                    {item.product?.brand && (
                      <div className="cart-item-variant">
                        {item.product.brand}
                      </div>
                    )}
                    <div className="quantity-picker" style={{ marginBottom: 0 }}>
                      <button
                        className="qty-btn"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity - 1)
                        }
                      >
                        <Minus size={16} />
                      </button>
                      <span className="qty-num">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity + 1)
                        }
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="cart-item-price">
                      ₹
                      {Number(
                        item.product?.price * item.quantity,
                      ).toLocaleString("en-IN")}
                    </div>
                    <div
                      className="cart-item-remove"
                      onClick={() => removeItem(item.product._id)}
                    >
                      <Trash2 size={13} /> Remove
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="heading mb-20">Order Summary</div>
            <div className="summary-row">
              <span className="summary-label">Subtotal ({itemCount} items)</span>
              <span className="summary-value">
                ₹{Number(total).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Delivery</span>
              <span className="summary-value" style={{ color: "var(--emerald)" }}>
                Free
              </span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{Number(total).toLocaleString("en-IN")}</span>
            </div>
            <button
              className="btn btn-primary w-full btn-lg mt-16"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                marginTop: "14px",
                fontSize: "12px",
                color: "var(--muted)",
              }}
            >
              <Lock size={13} /> Secured by 256-bit SSL encryption
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
