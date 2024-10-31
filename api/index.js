/// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Environment variables
dotenv.config();

// Constants
const PORT = process.env.PORT;

// Routes
const authRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");

// Express App Setup
const app = express(); // Initialize 'app' first

// CORS Configuration
const allowedOrigin = process.env.NODE_ENV === 'production'
  ? 'https://contacts-frontend-ecru.vercel.app/' // Deployed frontend URL
  : 'http://localhost:5173'; // Local development URL

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
}));

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/auth", authRoute);
app.use("/contacts", contactRoute);

// Test route
app.get("/", (req, res) => {
  res.json("Hello from the server!");
});

// Database Connection
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}

// Start the server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
