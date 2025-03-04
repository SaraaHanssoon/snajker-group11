const express = require("express");
const app = express();

app.use(express.json()); // Middleware för att tolka JSON

const cartItemRoutes = require("./routes/cartItemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const dealRoutes = require("./routes/dealRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

// API-rutter
app.use("/api/cartitems", cartItemRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app; // Exportera appen
