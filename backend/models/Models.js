import { mongoose } from 'mongoose';

const CardSchema = new mongoose.Schema({
    front: {
        type: String,
        required: true,
    },
    back: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Card', CardSchema)