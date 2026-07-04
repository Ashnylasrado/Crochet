import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", apiRoutes);
app.use("/api/chat", chatRoutes);

// Serve product images directly from backend/data/images
app.use("/product-images", express.static(path.join(__dirname, "data/images")));

// Serve built React frontend (copied into backend/public at deploy time)
app.use(express.static(path.join(__dirname, "public")));

// Any non-API route falls back to React's index.html (client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Crochet shop server running on port ${PORT}`);
});
