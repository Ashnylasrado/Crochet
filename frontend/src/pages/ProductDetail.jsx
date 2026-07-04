import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then(setProduct)
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return <p className="status">Product not found. <Link to="/">Go back home</Link></p>;
  if (!product) return <p className="status">Loading...</p>;

  return (
    <div className="detail-wrap">
      <Link to="/" className="back-link">&larr; Back to shop</Link>
      <div className="detail-grid">
        <img src={product.imageUrl} alt={product.name} className="detail-img" />
        <div className="detail-info">
          <h2>{product.name}</h2>
          <p className="detail-desc">{product.description}</p>
          <div className="price detail-price">${product.price.toFixed(2)}</div>
          <button className="btn" onClick={() => addToCart(product.id)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
