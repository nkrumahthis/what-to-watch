import express from "express"
import axios from "axios";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const app = express();
const port = process.env.VITE_APIPORT;

app.get('/movies', async (_, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_KEY}&include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
        )

        return res.json(response.data)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "server error" });
    }


    return res.json("hello world")
});

app.listen(port, () => {
    console.log("listening on port " + port);
});