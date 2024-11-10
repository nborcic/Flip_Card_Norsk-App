import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import wordRoutes from './routes/wordsApi.js';
import userRoutes from './routes/usersApi.js'; 1
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import Whitelist from './routes/whiteList.js';


dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);
app.use('/images', express.static(path.join(__dirname, 'images')));


// MongoDB connections
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use the word routes
app.use('/api/words', wordRoutes);

// Use the user routes
app.use('/api/users', userRoutes);

// Use the to make a new whitelisted users
app.use('/api/whitelist', Whitelist);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});