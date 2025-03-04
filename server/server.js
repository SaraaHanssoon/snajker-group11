const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes"); // Produkt-rutter
const cartItemRoutes = require("./routes/cartItemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const dealRoutes = require("./routes/dealRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

// Först: CORS Middleware
app.use(cors({
  origin: "http://localhost:5173",  // Tillåt specifik origin
  methods: "GET,POST,PUT,DELETE",  // Tillåt dessa metoder
  credentials: true                // Tillåt cookies
}));

app.use(express.json()); // Hantera JSON-data

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/cartitems", cartItemRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
