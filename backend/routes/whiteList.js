import mongoose from 'mongoose';
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();


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
    let blacklistedTokens = ["allowed2@gmail.com"];
    // token blacklisted?
    if (blacklistedTokens.includes(token)) {
        return res.status(403).send({ error: 'Token is blacklisted. Please log in again.' });
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
router.post('/', authenticateToken, async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ error: 'Email is required' });
    }
    try {
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

// Delete an email from the whitelist
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await Whitelist.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User with that ID not found' });
        }

        console.log("User deleted:", deletedUser);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
export { Whitelist };
