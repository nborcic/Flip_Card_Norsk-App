import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';

import __dirname from 'path';
import { Whitelist } from './whiteList.js';

const router = express.Router();

// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    avatar: { type: String },
});

// Pre-save to hash password
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        try {
            user.password = await bcrypt.hash(user.password, 8);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const User = mongoose.model('User', UserSchema);

// Middleware token authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];



    if (token == null) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
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

const blacklistedTokens = []; // blacklisted tokens after logoff

router.post('/api/logout', authenticateToken, (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    localStorage.removeItem('token');

    // Add the token to the blacklistedTokens
    blacklistedTokens.push(token);
    res.status(200).send({ message: 'Logout successful' });
});

router.delete('/:id', authenticateToken, getUser, async (req, res) => {
    try {
        // If user doesn't exist, respond with 404
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("User deleted", user);

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all users - /users/
router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.json(users);
    } catch (err) {
        res.status(500).json('Server Error: ' + err);
    }
});

// Get user by ID
router.get('/:id', authenticateToken, getUser, (req, res) => {
    res.json(res.user);
});

// Middleware to get user by ID
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const destPath = path.join(__dirname, '../images/');
//         console.log('Multer destination path:', destPath);
//         cb(null, destPath);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage });
async function userWhitelisted(req, res, next) {
    const email = req.body.email;
    const user = await Whitelist.findOne({ email });
    console.log("Found:", user);
    if (!user) {
        return res.status(404).json({ message: 'Email not authorized to registerR' });
    }
    next();
}

router.post('/register', userWhitelisted, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validate input data
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Create new user instance
        const user = new User({
            name,
            email,
            password,
        });

        // Save user to database
        await user.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// Login Endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(404).send({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch for email:", email);
            return res.status(400).send({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.MY_SECRET, { expiresIn: '1h' });

        res.send({ token, name: user.name });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ error: 'Login failed' });
    }
});

export default router;