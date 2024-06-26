import "./Panel.css";
import PropTypes from "prop-types"

function Panel({ movie, voter }) {
  return (
    <div className="panel" onClick={voter}>
      <img
        src={movie ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""}
      ></img>
      <h3>{ movie ? movie.original_title : "-" } </h3>
      <p>{ movie? movie.overview : "-" }</p>
    </div>
  );
}

Panel.propTypes = {
  movie: PropTypes.any,
  voter: PropTypes.func.isRequired,
}

export default Panel;
