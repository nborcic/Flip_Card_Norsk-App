import mongoose from 'mongoose';

const WordsSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    translation: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const ManyWordsSchema = new mongoose.Schema({
    level: {
        type: Object,
        required: true,
    },

}, {
    timestamps: true,
});


const word = mongoose.model('Word', WordsSchema);
const manyWords = mongoose.model('ManyWord', ManyWordsSchema);

export default word;
export { manyWords };