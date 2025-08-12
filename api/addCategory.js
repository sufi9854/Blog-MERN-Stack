const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/Category"); // Adjust path if needed

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

const categories = [
  { name: "Music" },
  { name: "Movies" },
  { name: "Sports" },
  { name: "Technology" },
  { name: "Travel" },
  { name: "Food" },
];

async function addCategories() {
  try {
    await Category.deleteMany(); // Optional: Clears old categories
    await Category.insertMany(categories);
    console.log("✅ Categories added successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error adding categories:", err);
    process.exit(1);
  }
}

async function run() {
  await connectDB();
  await addCategories();
}

run();
