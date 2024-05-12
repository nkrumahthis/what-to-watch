import { useState, useEffect } from "react"
import axios from "axios"
import "./Results.css"

export default function Results() {
  const apiUrl = `http://localhost:${import.meta.env.VITE_API_PORT}`

  const [results, setResults] = useState([]);

  const fetch = () => {
    axios
        .get(`${apiUrl}/votes`)
        .then((res) => {
            console.log(res.data.data);

            const ranking = res.data.data.sort((a,b) => b.votes - a.votes)
            setResults(ranking)
        })
        .catch((err) => {
            console.error("hehe", err);
        });
  };

  useEffect(() => {
    // make API call when component mounts
    fetch();
  }, []);

  return (
    <div className="page">
        <h2>Results</h2>
        <table>
            <tbody>
                {results ? results.map((result, index) => <tr key={index}>
                    <td>
                        <img
                            src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                        ></img></td>
                    <td>{ result.title }</td>
                    <td>{result.votes}</td>
                </tr>) : <tr><td>No results</td></tr>}
            </tbody>
        </table>
    </div>
  )
}
