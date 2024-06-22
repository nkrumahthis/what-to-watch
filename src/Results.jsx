import { useState, useEffect } from "react"
import axios from "axios"
import "./Results.css"

export default function Results() {
  const apiUrl = `http://localhost:${import.meta.env.VITE_API_PORT}`

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetch = (apiUrl) => {
    setLoading(true);
    axios
        .get(`${apiUrl}/votes`)
        .then((res) => {
            const ranking = res.data.data.sort((a,b) => b.votes - a.votes)
            setResults(ranking)
        })
        .catch((err) => {
            console.error(err);
            setError(err);
        })
        .finally(() =>{
            setLoading(false);
        });
  };

  useEffect(() => {
    // make API call when component mounts
    fetch(apiUrl);
  }, [apiUrl]);

  return (
    <div className="page">
        <h2>Results</h2>
        { loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>Error: {error} </p>
        ) : (
            results.length ? (
                <table>
                    <tbody>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Votes</th>
                        </tr>
                    </tbody>
                    <tbody>
                        { results.map((result, index) => (
                            <tr key={index}>
                                <td><img src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}/></td>
                                <td>{ result.title }</td>
                                <td>{ result.votes }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No results</p>
            )
        )}
        
    </div>
  )
}
