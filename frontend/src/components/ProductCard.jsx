import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product.id}`} className="card-title-link">
          <h3>{product.name}</h3>
        </Link>
        <p>{product.description}</p>
        <div className="price">${product.price.toFixed(2)}</div>
        <button className="btn" onClick={() => addToCart(product.id)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
