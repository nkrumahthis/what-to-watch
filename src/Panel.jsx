import "./Panel.css";

function Panel({ movie }) {
  function handleClick(e) {
    e.preventDefault();
    console.log("handle click");
    console.log("panel movie", movie);
  }

  return (
    <div className="panel" onClick={handleClick}>
      <img
        src={movie ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""}
      ></img>
      <p>{movie ? movie.original_title : "-"}</p>
    </div>
  );
}

export default Panel;
