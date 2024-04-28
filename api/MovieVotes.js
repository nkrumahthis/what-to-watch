import mongoose from "mongoose";

export default mongoose.model('MovieVotes', new mongoose.Schema({
    movie: String,
    votes: Number
}));