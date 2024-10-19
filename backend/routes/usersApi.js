import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();


const UserSchema = new mongoose.Schema({
    name: { type: String }
    // name: { type: String,  required: true, unique: true },
    // email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

//get all - /users/
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json('Server Error: ' + err);
    }
});

//get single middleware
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}
// get single ID
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

router.post('/register', async (req, res) => {
    const { name } = req.body;
    // const { name, email, password } = req.body;
    try {
        // const user = new User({ name, email, password });
        const user = new User({ name });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send({ error: 'User registration failedD' });
    }
});


// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ _id: user._id }, MY_SECRET, { expiresIn: '1h' }
        );
        res.send({ token });
    } catch (error) {
        res.status(500).send({ error: 'Login failed' });
    }
});

async function getUserByEmail(req, res, next) {
    let user;
    try {
        user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

router.get('/api/users/:email', getUserByEmail, (req, res) => {
    res.json(res.user);
});


export default router;