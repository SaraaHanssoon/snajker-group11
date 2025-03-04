const express = require("express");
const router = express.Router();
const { Product } = require("../models");

// Hämta alla produkter
router.get("/", async (req, res) => {
	try {
		const products = await Product.findAll();
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Hämta en specifik produkt
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (!product) return res.status(404).json({ error: "Product not found" });
		res.json(product);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Skapa en ny produkt
router.post("/", async (req, res) => {
	try {
		const { name, description, price, stock, fk_categoryid } = req.body;
		const newProduct = await Product.create({ name, description, price, stock, fk_categoryid });
		res.status(201).json(newProduct);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Uppdatera en produkt
router.put("/:id", async (req, res) => {
	try {
		const { name, description, price, stock } = req.body;
		await Product.update({ name, description, price, stock }, { where: { product_id: req.params.id } });
		res.json({ message: "Product updated" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Ta bort en produkt
router.delete("/:id", async (req, res) => {
	try {
		await Product.destroy({ where: { product_id: req.params.id } });
		res.json({ message: "Product deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
