const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT;
dotenv.config();
//END OF IMPORTS

const authRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");

// Check if the MongoDB URI is defined
if (!process.env.MONGODBURI) {
  console.error("Error: MongoDB URI is not defined in environment variables.");
  process.exit(1); 
}
mongoose
  .connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database connected: ${mongoose.connection.host}`))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); 
  });

// Middleware
app.use(cors()); // Allows all origins for testing purposes, you can restrict this later

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/auth", authRoute);
app.use("/contacts", contactRoute);

// Test route
app.get("/", (req, res) => {
  res.json("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
