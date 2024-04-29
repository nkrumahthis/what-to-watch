import express from "express"
import axios from "axios";
import dotenv from "dotenv";
import process from "process";
import cors from "cors";
import mongoose from "mongoose";
import MovieVotes from "./MovieVotes.js";

dotenv.config();

const app = express();
const port = process.env.API_PORT;

app.use(cors());
app.use(express.json());

app.get('/movies', async (req, res) => {
    console.log("get movies from " + req.ip)
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_DB_KEY}&include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
        )

        return res.json(response.data)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "server error" });
    }
});

app.post('/votes', async (req, res) => {
    console.log(req.body)
    const movie = req.body.movie

    const movieVote = await MovieVotes.findOne({id : movie.id})

    if(!movieVote) {
        const newMovieVote = await MovieVotes.create({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview,
            votes: 1
        });
        console.log("created new movieVote " + newMovieVote.id )
        return res.status(200).json({ movieVote: newMovieVote});
    } else {
        movieVote.votes += 1;
        await movieVote.save()
        res.status(200).json({ data: movieVote});
    }
});

app.get('/votes', async (req, res) => {
    if(req.query.movie){
        const movieVote = await MovieVotes.findOne({data: req.query.movie});
        if(!movieVote) {
            return res.status(404).json({error: 'Movie not found'});
        }
        return res.json({ data: movieVote })
    }

    const movieVotes = await MovieVotes.find({});
    return res.json({ data: movieVotes });
});

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection established")

    app.listen(port, () => {
        console.log("listening on http://localhost:" + port);
    });
}

main().catch(err => console.log(err));