const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes")
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


console.log('==categoryRoutes==', categoryRoutes, authRoutes)

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

