import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/flipcards', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Card model
const cardSchema = new mongoose.Schema({
  frontText: String,
  backText: String,
});

const Card = mongoose.model('Card', cardSchema);

// Routes

// Get all cards
app.get('/api/cards', async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
});

// Add a new card
app.post('/api/cards', async (req, res) => {
  const newCard = new Card(req.body);
  await newCard.save();
  res.json(newCard);
});

// Delete a card
app.delete('/api/cards/:id', async (req, res) => {
  await Card.findByIdAndDelete(req.params.id);
  res.json({ message: 'Card deleted' });
});

// Start server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
