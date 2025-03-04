const express = require("express");
const router = express.Router();
const { Category } = require("../models");

// Hämta alla kategorier
router.get("/", async (req, res) => {
	try {
		const categories = await Category.findAll();
		res.json(categories);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Hämta en specifik kategori
router.get("/:id", async (req, res) => {
	try {
		const category = await Category.findByPk(req.params.id);
		if (!category) return res.status(404).json({ error: "Category not found" });
		res.json(category);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Skapa en ny kategori
router.post("/", async (req, res) => {
	try {
		const { name } = req.body;
		const newCategory = await Category.create({ name });
		res.status(201).json(newCategory);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Uppdatera en kategori
router.put("/:id", async (req, res) => {
	try {
		const { name } = req.body;
		await Category.update({ name }, { where: { category_id: req.params.id } });
		res.json({ message: "Category updated" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Ta bort en kategori
router.delete("/:id", async (req, res) => {
	try {
		await Category.destroy({ where: { category_id: req.params.id } });
		res.json({ message: "Category deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
