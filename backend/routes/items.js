const express = require('express');
const Item = require('../models/Item');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

// Middleware for authentication
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// CRUD Routes
router.get('/', auth, async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  const { name, description, price } = req.body;
  const item = new Item({ name, description, price });
  await item.save();
  res.status(201).json(item);
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const item = await Item.findByIdAndUpdate(id, { name, description, price }, { new: true });
  res.json(item);
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.json({ message: 'Item deleted' });
});

module.exports = router;
