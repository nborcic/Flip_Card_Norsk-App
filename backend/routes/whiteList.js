// models/Whitelist.js

import mongoose from 'mongoose';
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Define the whitelist schema
const WhitelistSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
});

const Whitelist = mongoose.model('Whitelist', WhitelistSchema);

// Middleware for authenticating token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.MY_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};


// Get all whitelisted emails
router.get('/', authenticateToken, async (req, res) => {
    try {
        const whitelist = await Whitelist.find();
        res.json(whitelist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new email to the whitelist
router.post('/add', authenticateToken, async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ error: 'Email is required' });
    }

    try {
        // Check if the email already exists
        const exists = await Whitelist.findOne({ email });
        if (exists) {
            return res.status(400).send({ message: 'Email already in whitelist' });
        }

        const whitelist = new Whitelist({ email });
        await whitelist.save();
        res.status(201).send({ message: 'User added to whitelist' });
    } catch (error) {
        res.status(400).send({ error: 'Error adding user to whitelist' });
    }
});

export default router;
