const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Load env vars
dotenv.config();

const app = express();

// --- CORS setup ---
const allowed = (process.env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim());
app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin) return cb(null, true); // allow server-to-server and tools
      if (allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

// --- Middleware ---
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// --- Health check ---
app.get("/health", (req, res) => res.send("ok"));

// --- Multer setup for uploads ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// --- Routes ---
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// --- Database + Server start ---
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    // You can add options here if needed
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running.");
  });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
  