import { useState } from "react";
import "./App.css";
import Panel from "./Panel.jsx";
import { useEffect } from "react";
import axios from "axios";

function App() {
	const [leftMovie, setLeftMovie] = useState(null);
	const [rightMovie, setRightMovie] = useState(null);

	const pickRandomMovie = (res) => {
		const randomMovieIndex = Math.floor(
			Math.random() * res.data.results.length
		);
		const chosenMovie = res.data.results[randomMovieIndex];
		return chosenMovie;
	};

	const fetch = () => {
		axios
			.get(`http://localhost:${import.meta.env.VITE_API_PORT}/movies`)
			.then((res) => {
				setLeftMovie(pickRandomMovie(res));
				setRightMovie(pickRandomMovie(res));
			})
			.catch((err) => {
				console.error(err.response);
			});
	};

	useEffect(() => {
		// make API call when component mounts
		fetch();
	}, []);

	function vote(side) {
		console.log("you voted", side);
		fetch();
	}

	return (
		<div className="main">
			<h2>Which movie is best?</h2>
			<div className="choice-row">
				<Panel movie={leftMovie} voter={() => vote("left")} />
				<Panel movie={rightMovie} voter={() => vote("right")} />
			</div>
		</div>
	);
}

export default App;
