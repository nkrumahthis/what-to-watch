import { useState } from "react";
import "./App.css";
import Panel from "./Panel.jsx";
import { useEffect } from "react";
import axios from "axios";

function App() {
	const apiUrl = `http://localhost:${import.meta.env.VITE_API_PORT}`
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
			.get(`${apiUrl}/movies`)
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

	function vote(movie) {
		axios.post(`${apiUrl}/votes`, {
			movie: {
				id : movie.id,
				poster_path : movie.poster_path,
				overview: movie.overview,
				title: movie.title
			}
		}).then(res => {
			console.log(res);
		}).catch(console.error);
		fetch();
	}

	return (
		<div className="page">
			<h2>Which movie is best?</h2>
			<div className="choice-row">
				<Panel movie={leftMovie} voter={() => vote(leftMovie)} />
				<Panel movie={rightMovie} voter={() => vote(rightMovie)} />
			</div>
		</div>
	);
}

export default App;
