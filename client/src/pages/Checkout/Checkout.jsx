import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  Lock,
  ShieldCheck,
  ArrowLeft,
  CircleCheck,
} from "lucide-react";
import api from "../../api/axios";
import useDocumentTitle from "../../lib/useDocumentTitle";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", Icon: CreditCard },
  { id: "upi", label: "UPI", Icon: Wallet },
  { id: "cod", label: "Cash on Delivery", Icon: Banknote },
];

const emptyAddress = {
  fullName: "",
  phone: "",
  line1: "",
  city: "",
  state: "",
  pincode: "",
};

function Checkout() {
  useDocumentTitle("Checkout · Shopwise AI");
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [address, setAddress] = useState(emptyAddress);
  const [payment, setPayment] = useState("card");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      toast.error("Please log in to checkout");
      navigate("/login");
      return;
    }
    (async () => {
      try {
        const res = await api.get("/cart");
        setCart(res.data.cart);
      } catch {
        toast.error("Could not load your cart");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const items = cart?.items || [];
  const subtotal = items.reduce(
    (sum, it) => sum + (it.product?.price || 0) * it.quantity,
    0,
  );
  const itemCount = items.length;

  const onField = (e) =>
    setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));

  const validate = () => {
    const required = ["fullName", "phone", "line1", "city", "state", "pincode"];
    for (const key of required) {
      if (!address[key].trim()) {
        toast.error("Please complete your shipping address");
        return false;
      }
    }
    if (!/^\d{10}$/.test(address.phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return false;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      toast.error("Enter a valid 6-digit pincode");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (placing) return;
    if (itemCount === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!validate()) return;

    setPlacing(true);
    try {
      await api.post("/orders/place-order", {
        shippingAddress: address,
        paymentMethod: payment,
      });
      toast.success("Order placed successfully 🎉");
      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="container section-sm text-center text-muted">Loading…</div>
    );
  }

  if (itemCount === 0) {
    return (
      <div className="container section-sm">
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <MapPin size={36} strokeWidth={1.6} />
          </div>
          <h1 className="heading mb-8">Nothing to check out</h1>
          <p className="text-muted mb-24">
            Add items to your cart before checking out.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/products")}>
            Browse products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-sm">
      <button
        className="btn btn-ghost btn-sm mb-16"
        onClick={() => navigate("/cart")}
      >
        <ArrowLeft size={15} /> Back to cart
      </button>
      <div className="eyebrow">Secure checkout</div>
      <h1 className="display-md mb-32">Complete your order</h1>

      <form className="cart-layout" onSubmit={handlePlaceOrder}>
        <div>
          {/* Shipping */}
          <div className="form-section">
            <div className="form-section-title">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <MapPin size={16} /> Shipping address
              </span>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full name</label>
                <input id="fullName" name="fullName" className="form-input"
                  value={address.fullName} onChange={onField} autoComplete="name" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" className="form-input" inputMode="numeric"
                  value={address.phone} onChange={onField} autoComplete="tel"
                  placeholder="10-digit number" required />
              </div>
            </div>
            <div className="form-group mt-16">
              <label className="form-label" htmlFor="line1">Address</label>
              <input id="line1" name="line1" className="form-input"
                value={address.line1} onChange={onField} autoComplete="street-address"
                placeholder="House no, street, area" required />
            </div>
            <div className="form-row mt-16">
              <div className="form-group">
                <label className="form-label" htmlFor="city">City</label>
                <input id="city" name="city" className="form-input"
                  value={address.city} onChange={onField} autoComplete="address-level2" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="state">State</label>
                <input id="state" name="state" className="form-input"
                  value={address.state} onChange={onField} autoComplete="address-level1" required />
              </div>
            </div>
            <div className="form-group mt-16" style={{ maxWidth: 220 }}>
              <label className="form-label" htmlFor="pincode">Pincode</label>
              <input id="pincode" name="pincode" className="form-input" inputMode="numeric"
                value={address.pincode} onChange={onField} autoComplete="postal-code"
                placeholder="6-digit" required />
            </div>
          </div>

          {/* Payment */}
          <div className="form-section">
            <div className="form-section-title">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CreditCard size={16} /> Payment method
              </span>
            </div>
            <div role="radiogroup" aria-label="Payment method" style={{ display: "grid", gap: 10 }}>
              {PAYMENT_METHODS.map(({ id, label, Icon }) => (
                <button
                  type="button"
                  key={id}
                  role="radio"
                  aria-checked={payment === id}
                  className="option-chip"
                  onClick={() => setPayment(id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    justifyContent: "flex-start", width: "100%",
                    borderColor: payment === id ? "var(--gold)" : "var(--border)",
                    color: payment === id ? "var(--gold-lt)" : "var(--body)",
                    background: payment === id ? "rgba(224,166,70,.1)" : "var(--elevated)",
                    minHeight: 52,
                  }}
                >
                  <Icon size={18} />
                  {label}
                  {payment === id && (
                    <CircleCheck size={18} style={{ marginLeft: "auto" }} />
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted mt-12" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Lock size={13} /> This is a demo checkout — no real payment is charged.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="order-summary">
          <div className="heading mb-20">Order summary</div>
          {items.map((it) => (
            <div className="summary-row" key={it._id}>
              <span className="summary-label" style={{ maxWidth: "70%" }}>
                {it.product?.title} × {it.quantity}
              </span>
              <span className="summary-value">
                ₹{Number((it.product?.price || 0) * it.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
          <div className="divider" />
          <div className="summary-row">
            <span className="summary-label">Subtotal ({itemCount} items)</span>
            <span className="summary-value">₹{Number(subtotal).toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Delivery</span>
            <span className="summary-value discount">Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{Number(subtotal).toLocaleString("en-IN")}</span>
          </div>
          <button
            className="btn btn-primary w-full btn-lg mt-16"
            type="submit"
            disabled={placing}
          >
            <Lock size={17} /> {placing ? "Placing order…" : "Place order"}
          </button>
          <div className="trust-item" style={{ justifyContent: "center", marginTop: 14 }}>
            <ShieldCheck size={14} /> Secured by 256-bit SSL encryption
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
