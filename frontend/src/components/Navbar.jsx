import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar({ categories }) {
  const { cart } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-top">
        <Link to="/" className="logo">
          <img src="/product-images/logo.png" alt="Crochet Shop" className="logo-img" />
          <span>ExpressionsByAshny</span>
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/cart" className="cart-link">🛒 Cart ({cart.length})</Link>
        </nav>
      </div>
      <div className="navbar-categories">
        <Link to="/" className="category-pill">All</Link>
        {categories.map((c) => (
          <Link key={c.id} to={`/?category=${c.id}`} className="category-pill">
            {c.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
