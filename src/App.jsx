import { useState } from "react";
import "./App.css";
import Panel from "./Panel.jsx";
import { useEffect } from "react";
import axios from "axios";

function App() {
	const apiUrl = `http://localhost:${import.meta.env.VITE_API_PORT}`
	const [leftMovie, setLeftMovie] = useState(null);
	const [rightMovie, setRightMovie] = useState(null);
	const [loading, setLoading] = useState(false);

	const pickRandomMovie = (res) => {
		const randomMovieIndex = Math.floor(
			Math.random() * res.data.results.length
		);
		const chosenMovie = res.data.results[randomMovieIndex];
		return chosenMovie;
	};

	const fetch = () => {
		setLoading(true);
		axios
			.get(`${apiUrl}/movies`)
			.then((res) => {
				setLeftMovie(pickRandomMovie(res));
				setRightMovie(pickRandomMovie(res));

				if(leftMovie && rightMovie){
					while (rightMovie.id === leftMovie.id) {
						setRightMovie(pickRandomMovie(res));
					}
				}
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		// make API call when component mounts
		fetch();
	}, []);

	function vote(movie) {
		axios
		.post(`${apiUrl}/votes`, {
			movie: {
				id : movie.id,
				poster_path : movie.poster_path,
				overview: movie.overview,
				title: movie.title
			}
		})
		.then(res => {
			console.log(res);
		})
		.catch(console.error)
		.finally(() => {
            fetch();
        });
	}

	return (
		<div className="page">
			<h2>Which movie is best?</h2>
			{ (loading) ? 
				<p>Loading...</p> 
				:
				<div className="choice-row">
					<Panel movie={leftMovie} voter={() => vote(leftMovie)} />
					<Panel movie={rightMovie} voter={() => vote(rightMovie)} />
				</div>
			}
		</div>
	);
}

export default App;
