const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
//const authMiddleware = require('../middleware/authMiddleware');

// Middleware to check authentication
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    const [scheme, tokenValue] = token.split(' ');
    if (scheme !== 'Bearer' || !tokenValue) return res.status(401).json({ message: 'Invalid token format' });
  
    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      req.userId = decoded.userId;
      next();
    });
  };
  

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('reviews.user', 'username');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new book
router.post('/', authMiddleware, [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('year').isNumeric().withMessage('Year must be a number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, year } = req.body;
  try {
    const book = new Book({ title, author, year });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a book
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, author, year } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { title, author, year }, { new: true });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a book
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a review to a book
router.post('/:id/review', authMiddleware, [
  body('text').notEmpty().withMessage('Review text is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { text, rating } = req.body;
  try {
    const review = { user: req.userId, text, rating };
    const book = await Book.findById(req.params.id);
    book.reviews.push(review);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all reviews for a particular book
router.get('/:id/reviews', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate('reviews.user', 'username');
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.json(book.reviews);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
