import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Word from './models/words.js';







// Configuration
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to get an item by ID
const getItem = async (req, res, next) => {
  let item;
  try {
    item = await Word.findById(req.params.id);
    if (Word == null) {
      return res.status(404).json({ message: 'Cannot find item' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.item = item;
  next();
};

// Get all items
app.get('/api/words', async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new word
app.post('/api/words', async (req, res) => {
  const newWord = new Word({
    word: req.body.word,
    translation: req.body.translation,
  });

  try {
    const savedWord = await newWord.save();
    res.status(201).json(savedWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single item by ID
app.get('/api/words/:id', getItem, (req, res) => {
  res.json(res.item).send("GET done");
});

//dashboard api
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






// Update an item
app.patch('/api/words/:id', getItem, async (req, res) => {
  if (req.body.word != null) {
    res.item.word = req.body.word;
  }
  if (req.body.quantity != null) {
    res.item.quantity = req.body.quantity;
  }
  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
app.delete('/api/items/:id', getItem, async (req, res) => {
  try {
    await res.item.remove();
    res.json({ message: 'Deleted Item' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});