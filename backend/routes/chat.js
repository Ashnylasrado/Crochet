import express from "express";
import { products } from "../data/products.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not set on the server" });
  }

  const catalogSummary = products
    .map((p) => `- id:${p.id} | ${p.name} | category:${p.category} | $${p.price} | tags: ${(p.tags || []).join(", ")} | ${p.description}`)
    .join("\n");

  const systemPrompt = `You are a friendly shop assistant for "Crochet Shop", a handmade crochet e-commerce site.
Only recommend products from the catalog below — never invent products that aren't listed.
Keep the reply short (2-4 sentences), warm, and helpful. If nothing in the catalog fits, say so honestly
and suggest browsing the "All" category instead.

Catalog:
${catalogSummary}

Respond ONLY with valid JSON, no markdown fences, no extra text, in exactly this shape:
{"reply": "your short friendly answer here", "productIds": [list of matching product id numbers, or empty array if none]}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nCustomer question: ${message}` }]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", JSON.stringify(data));
      return res.status(502).json({ error: "AI service error" });
    }

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (parseErr) {
      console.error("Failed to parse Gemini JSON:", rawText);
      parsed = { reply: rawText, productIds: [] };
    }

    const reply = parsed.reply || "Sorry, I couldn't come up with an answer just now.";
    const validIds = Array.isArray(parsed.productIds)
      ? parsed.productIds.filter((id) => products.some((p) => p.id === id))
      : [];

    const recommendedProducts = validIds.map((id) => products.find((p) => p.id === id));

    res.json({ reply, products: recommendedProducts });
  } catch (err) {
    console.error("Chat route failed:", err);
    res.status(500).json({ error: "Something went wrong talking to the AI service" });
  }
});

export default router;