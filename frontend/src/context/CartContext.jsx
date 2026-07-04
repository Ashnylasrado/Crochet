import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const refreshCart = () => {
    fetch("/api/cart").then((r) => r.json()).then(setCart);
    fetch("/api/cart/total").then((r) => r.json()).then((d) => setTotal(d.total));
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = (id) => {
    fetch(`/api/cart/add/${id}`, { method: "POST" })
      .then((r) => r.json())
      .then(() => refreshCart());
  };

  const removeFromCart = (id) => {
    fetch(`/api/cart/remove/${id}`, { method: "POST" })
      .then((r) => r.json())
      .then(() => refreshCart());
  };

  const clearCart = () => {
    fetch(`/api/cart/clear`, { method: "POST" })
      .then((r) => r.json())
      .then(() => refreshCart());
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
