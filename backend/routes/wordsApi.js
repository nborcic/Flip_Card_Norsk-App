import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define Word model
const wordSchema = new mongoose.Schema({
    word: String,
    translation: String
});

const Word = mongoose.model('Word', wordSchema);

// Middleware to get a single item by ID
async function getItem(req, res, next) {
    let item;
    try {
        item = await Word.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.item = item;
    next();
}

// Get all items
router.get('/', async (req, res) => {
    try {
        const words = await Word.find();
        res.json(words);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single item by ID
router.get('/:id', getItem, (req, res) => {
    res.json(res.item);
});





// Create a new word
router.post('/', async (req, res) => {
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

router.delete('/:id', getItem, async (req, res) => {

    try {
        const item = Word.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;