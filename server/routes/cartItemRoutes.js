const express = require("express");
const router = express.Router();
const { CartItem } = require("../models");

// Hämta alla cartItems
router.get("/", async (req, res) => {
	try {
		const cartItems = await CartItem.findAll();
		res.json(cartItems);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Lägg till ett objekt i varukorgen
router.post("/", async (req, res) => {
	try {
		const { fk_cartid, fk_productid, quantity } = req.body;
		const newCartItem = await CartItem.create({ fk_cartid, fk_productid, quantity });
		res.status(201).json(newCartItem);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Uppdatera antal i varukorgen
router.put("/:id", async (req, res) => {
	try {
		const { quantity } = req.body;
		await CartItem.update({ quantity }, { where: { cartItem_id: req.params.id } });
		res.json({ message: "Cart item updated" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Ta bort ett objekt från varukorgen
router.delete("/:id", async (req, res) => {
	try {
		await CartItem.destroy({ where: { cartItem_id: req.params.id } });
		res.json({ message: "Cart item deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
