import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { cart, total, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="wrap">
        <p className="empty">Your cart is empty.</p>
        <Link to="/" className="btn" style={{ display: "inline-block", textDecoration: "none" }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap">
      <h2>Your Cart</h2>
      {cart.map((item, idx) => (
        <div className="item" key={idx}>
          <div className="item-name">{item.name}</div>
          <div className="item-right">
            <div className="item-price">${item.price.toFixed(2)}</div>
            <button className="remove" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="total">Total: ${total.toFixed(2)}</div>
      <button className="btn checkout-btn" onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
    </div>
  );
}
