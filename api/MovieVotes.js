import mongoose from "mongoose";

export default mongoose.model('MovieVotes', new mongoose.Schema({
    id: String,
    title: String,
    poster_path: String,
    overview: String,
    votes: Number
}));