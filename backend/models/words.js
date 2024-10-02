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

const DashboardSchema = new mongoose.Schema({
    title: String,
    value: Number,
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});



const DashboardData = mongoose.model('DashboardData', DashboardSchema);
const Word = mongoose.model('Word', WordsSchema);
const ManyWords = mongoose.model('ManyWords', ManyWordsSchema);
const LoginUser = mongoose.model('LoginUser', UserSchema);

export default Word;
export { ManyWords, DashboardData, LoginUser };