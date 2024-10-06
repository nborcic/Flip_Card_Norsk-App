import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();


const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

//  route for user-related operations
router.get('/', (req, res) => {
    res.send('User routes');
});

export default router;