import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="wrap">
        <div className="confirmation">
          <h2>🎉 Order Placed!</h2>
          <p>Thanks{name ? `, ${name}` : ""}! Your handmade crochet items are being prepared.</p>
          <Link to="/" className="btn" style={{ display: "inline-block", textDecoration: "none" }}>
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="wrap">
        <p className="empty">Your cart is empty — nothing to check out.</p>
        <Link to="/">Go back to shop</Link>
      </div>
    );
  }

  return (
    <div className="wrap">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        {cart.map((item, idx) => (
          <div className="item" key={idx}>
            <div className="item-name">{item.name}</div>
            <div className="item-price">${item.price.toFixed(2)}</div>
          </div>
        ))}
        <div className="total">Total: ${total.toFixed(2)}</div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Shipping Address
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <button className="btn checkout-btn" type="submit">
          Place Order
        </button>
        <p className="note">This is a demo checkout — no real payment is processed.</p>
      </form>
    </div>
  );
}
