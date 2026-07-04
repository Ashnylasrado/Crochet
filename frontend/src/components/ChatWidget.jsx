import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! Ask me anything — like \"something for a baby\" or \"gift under $30\".", products: [] }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text, products: [] }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.reply, products: data.products || [] }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: `Error: ${data.error || "something went wrong"}`, products: [] }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, I couldn't reach the assistant right now.", products: [] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <span>🧶 Shop Assistant</span>
            <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                <div>{m.text}</div>
                {m.products && m.products.length > 0 && (
                  <div className="chat-product-links">
                    {m.products.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        className="chat-product-link"
                        onClick={() => setOpen(false)}
                      >
                        <img src={p.imageUrl} alt={p.name} />
                        <div>
                          <div className="chat-product-name">{p.name}</div>
                          <div className="chat-product-price">${p.price.toFixed(2)}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="chat-bubble assistant">Thinking...</div>}
            <div ref={bottomRef} />
          </div>
          <form className="chat-input-row" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our products..."
            />
            <button type="submit" disabled={loading}>Send</button>
          </form>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}