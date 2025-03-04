const express = require("express");
const router = express.Router();
const { Cart } = require("../models");

// Hämta alla kundvagnar
router.get("/", async (req, res) => {
	try {
		const carts = await Cart.findAll();
		res.json(carts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Skapa en ny kundvagn
router.post("/", async (req, res) => {
	try {
		const { fk_userid } = req.body;
		const newCart = await Cart.create({ fk_userid });
		res.status(201).json(newCart);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Ta bort en kundvagn
router.delete("/:id", async (req, res) => {
	try {
		await Cart.destroy({ where: { cart_id: req.params.id } });
		res.json({ message: "Cart deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
