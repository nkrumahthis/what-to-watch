import { useState } from "react";
import "./App.css";
import Panel from "./Panel.jsx";
import { useEffect } from "react";
import axios from "axios";
import process from "process";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // make API call when component mounts
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key="+process.env.VITE_API_TOKEN+"&include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, []);

  function pick(movies) {
    const movie = movies[Math.floor(Math.random() * movies.length)];
    console.log("movie", movie);
    return movie;
  }

  return (
    <div className="main">
      <h2>Which movie is best?</h2>
      <div className="choice-row">
        <Panel movie={pick(movies)} />
        <Panel movie={pick(movies)} />
      </div>
    </div>
  );
}

export default App;
