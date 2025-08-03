const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require('./middleware/errorHandler');

dotenv.config();    // Load environment variables

connectDB();    // Connect to MongoDB

// Initialize app
const app = express();
const PORT = process.env.PORT || 5018;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const blogRouter = require("./blog/router");
const commentRouter = require("./comment/router");
const authRouter = require("./user/router"); // for future auth

// Error handler must go AFTER routes
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Blog Platform API is running...");
});

app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);
app.use("/api/auth", authRouter); // enable when auth is added

// Start server
app.listen(PORT, () => {
  console.log(`OK, Server is running on http://localhost:${PORT}`);
});
