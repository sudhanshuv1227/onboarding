require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// MongoDB connection with fallback
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/riggle";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.log("Falling back to local MongoDB...");
    // Fallback to local MongoDB
    mongoose.connect("mongodb://localhost:27017/riggle");
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Import modular routes
const userRoutes = require("./routes/userRoutes");
const brandRoutes = require("./routes/brandRoutes");

const designationRoutes = require("./routes/designationRoutes");
const onboardingFileRoutes = require("./routes/onboardingFileRoutes");

// Use modular routes
app.use("/", userRoutes);
app.use("/", brandRoutes);
app.use("/", designationRoutes);
app.use("/", onboardingFileRoutes);

// Plans endpoint (keep here for now)
app.get("/plans", (req, res) => {
  res.json([
    {
      name: "Pro",
      price6Months: 599,
      price12Months: 999,
      minUsers: 30,
      features: [
        "Assisted Onboarding",
        "Telephonic Customer Support",
        "Everything of Trial Plan",
        "Map credits worth ₹ 1000/month",
      ],
    },
    {
      name: "Custom",
      priceStart: 300,
      minUsers: 100,
      features: [
        "Priority Onboarding",
        "Dedicated Key Account Manager",
        "Business Consulting",
        "Tailor made solution",
        "Everything on Pro Plan",
        "Your trusted technology partner",
      ],
      contactEmail: "hello@riggleapp.in",
    },
  ]);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
