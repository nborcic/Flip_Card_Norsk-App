import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});

//TODO
//wrong answers structure define 
//isAdmin field in UserSchema


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

router.post('/logout', authenticateToken, (req, res) => {
    const token = req.token;

    // Add the token to the blacklistedTokens
    blacklistedTokens.push(token);
    res.status(200).send({ message: 'Logout successful' });
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
        user = await User.findById(req.params.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}

// Register Endpoint - /users/register - name, email, password
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Create a new user instance
        const user = new User({ name, email, password });

        // Save the user to the database (pre-save hook will hash password)
        await user.save();
        res.status(201).send({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).send({ success: false, error: error.message || 'User registration failed' });
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
        res.send({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ error: 'Login failed' });
    }
});


export default router;
