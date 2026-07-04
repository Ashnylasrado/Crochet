import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

export default function Home({ categories }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  useEffect(() => {
    setLoading(true);
    const url = activeCategory ? `/api/products?category=${activeCategory}` : "/api/products";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [activeCategory]);

  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name;

  return (
    <div>
      <div className="hero">
        <h2>Handmade with love, one stitch at a time</h2>
        <p>{activeCategoryName ? `Browsing: ${activeCategoryName}` : "Browse all our crochet pieces"}</p>
      </div>
      {loading ? (
        <p className="status">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="status">No products in this category yet.</p>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
