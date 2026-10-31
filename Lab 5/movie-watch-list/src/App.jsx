import { useState } from "react";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [reviews, setReviews] = useState({});

  function addMovie(event) {
    event.preventDefault();

    if (!movieName.trim()) return;

    const newMovie = {
      id: Date.now(),
      name: movieName.trim(),
      rating: 0,
      review: ""
    };

    setMovies([...movies, newMovie]);
    setMovieName("");
  }

  function removeMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));

    const updatedReviews = { ...reviews };
    delete updatedReviews[id];
    setReviews(updatedReviews);
  }

  function changeRating(id, rating) {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, rating } : movie
      )
    );
  }

  function saveReview(id) {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, review: reviews[id] || "" }
          : movie
      )
    );
  }

  const totalStars = movies.reduce((total, movie) => total + movie.rating, 0);

  return (
    <div className="app">
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body, #root {
          min-height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        body {
          background: #f3f4f6 !important;
          color: #222 !important;
          font-family: Arial, sans-serif;
        }

        #root {
          max-width: none !important;
          margin: 0 !important;
          text-align: left !important;
        }

        .app {
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          padding: 40px 20px;
          color: #222;
        }

        h1 {
          text-align: center;
          font-size: 32px;
          margin: 0 0 8px;
          color: #202044;
        }

        .subtitle {
          text-align: center;
          color: #666;
          margin: 0 0 28px;
        }

        .summary {
          background: #fff1c2;
          color: #654900;
          border: 1px solid #f1d77c;
          padding: 16px;
          border-radius: 10px;
          text-align: center;
          margin-bottom: 22px;
          font-weight: bold;
        }

        .add-form {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
        }

        input, textarea {
          width: 100%;
          min-width: 0;
          padding: 12px;
          border: 1px solid #cbd0d9;
          border-radius: 7px;
          background: #fff !important;
          color: #222 !important;
          font-family: Arial, sans-serif;
          font-size: 15px;
        }

        input::placeholder, textarea::placeholder {
          color: #888;
          opacity: 1;
        }

        .add-form input {
          flex: 1;
        }

        button {
          border: none;
          border-radius: 7px;
          padding: 11px 15px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
        }

        .add-button, .save-button {
          background: #303078 !important;
          color: white !important;
        }

        .movie {
          background: #fff;
          color: #222;
          padding: 20px;
          border: 1px solid #e1e3e8;
          border-radius: 11px;
          margin-bottom: 16px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .movie-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .movie h2 {
          color: #202044;
          font-size: 20px;
          margin: 0;
          overflow-wrap: anywhere;
        }

        .remove-button {
          background: #ffe7e7 !important;
          color: #b42318 !important;
        }

        .rating {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 3px;
          margin: 18px 0;
          color: #333;
        }

        .star-button {
          background: transparent !important;
          color: #f2ad00 !important;
          padding: 2px;
          font-size: 27px;
        }

        .rating-number {
          margin-left: 7px;
          color: #555;
        }

        .review-label {
          display: block;
          font-weight: bold;
          color: #333;
          margin: 12px 0 8px;
        }

        textarea {
          display: block;
          resize: vertical;
          min-height: 75px;
          margin-bottom: 10px;
        }

        .saved-review {
          background: #f5f6fa;
          color: #333;
          border-radius: 7px;
          padding: 12px;
          margin-top: 12px;
          overflow-wrap: anywhere;
        }

        .empty {
          text-align: center;
          color: #666;
          background: white;
          border-radius: 10px;
          padding: 25px;
        }

        @media (max-width: 480px) {
          .add-form {
            flex-direction: column;
          }

          .movie-header {
            align-items: flex-start;
          }
        }
      `}</style>

      <h1>🎬 My Movie Watch List</h1>
      <p className="subtitle">Keep track of the movies you watch!</p>

      <div className="summary">
        Total stars given: {totalStars} ⭐
      </div>

      <form className="add-form" onSubmit={addMovie}>
        <input
          type="text"
          placeholder="Enter a movie name..."
          value={movieName}
          onChange={(event) => setMovieName(event.target.value)}
        />
        <button className="add-button" type="submit">
          Add Movie
        </button>
      </form>

      {movies.length === 0 ? (
        <p className="empty">You haven't added any movies yet.</p>
      ) : (
        movies.map((movie) => (
          <div className="movie" key={movie.id}>
            <div className="movie-header">
              <h2>{movie.name}</h2>
              <button
                className="remove-button"
                onClick={() => removeMovie(movie.id)}
                type="button"
              >
                Remove
              </button>
            </div>

            <div className="rating">
              <strong>Rating:</strong>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  className="star-button"
                  key={star}
                  onClick={() => changeRating(movie.id, star)}
                  type="button"
                  aria-label={`Rate ${star} stars`}
                >
                  {star <= movie.rating ? "⭐" : "☆"}
                </button>
              ))}
              <span className="rating-number">{movie.rating}/5</span>
            </div>

            <label className="review-label" htmlFor={`review-${movie.id}`}>
              Write your review:
            </label>
            <textarea
              id={`review-${movie.id}`}
              placeholder="What did you think about this movie?"
              value={reviews[movie.id] ?? movie.review}
              onChange={(event) =>
                setReviews({ ...reviews, [movie.id]: event.target.value })
              }
            />

            <button
              className="save-button"
              onClick={() => saveReview(movie.id)}
              type="button"
            >
              Save Review
            </button>

            {movie.review && (
              <div className="saved-review">
                <strong>Your review:</strong>
                <p>{movie.review}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
