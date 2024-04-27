import { useState } from "react";
import "./App.css";
import Panel from "./Panel.jsx";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [leftMovie, setLeftMovie] = useState(null);
  const [rightMovie, setRightMovie] = useState(null);

  const pickRandomMovie = (res) => {
    const randomMovieIndex = Math.floor(Math.random() * res.data.results.length);
    const chosenMovie = res.data.results[randomMovieIndex]
    return chosenMovie;
  }

  useEffect(() => {
    // make API call when component mounts
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_TOKEN}&include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
      )
      .then((res) => {
        setLeftMovie(pickRandomMovie(res));
        setRightMovie(pickRandomMovie(res));
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, []);

  function vote(side) {
    console.log("you voted", side);
  }

  return (
    <div className="main">
      <h2>Which movie is best?</h2>
      <div className="choice-row">
        <Panel movie={ leftMovie } onClick={() => vote("left")} />
        <Panel movie={ rightMovie } onClick={() => vote("right")} />
      </div>
    </div>
  );
}

export default App;
