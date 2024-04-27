import express from "express"
import axios from "axios";
import dotenv from "dotenv";
import process from "process";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.API_PORT;

app.use(cors())

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

app.listen(port, () => {
    console.log("listening on http://localhost:" + port);
});