const express = require("express");
const router = express.Router();
const { Deal } = require("../models");

// Hämta alla deals
router.get("/", async (req, res) => {
	try {
		const deals = await Deal.findAll();
		res.json(deals);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Skapa en ny deal
router.post("/", async (req, res) => {
	try {
		const { description, discount, fk_productid } = req.body;
		const newDeal = await Deal.create({ description, discount, fk_productid });
		res.status(201).json(newDeal);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Uppdatera en deal
router.put("/:id", async (req, res) => {
	try {
		const { description, discount } = req.body;
		await Deal.update({ description, discount }, { where: { deal_id: req.params.id } });
		res.json({ message: "Deal updated" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Ta bort en deal
router.delete("/:id", async (req, res) => {
	try {
		await Deal.destroy({ where: { deal_id: req.params.id } });
		res.json({ message: "Deal deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
