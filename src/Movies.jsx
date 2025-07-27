import React, { useEffect, useState } from 'react';
import './App.css';

const Movies = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for movies
  const [error, setError] = useState(null); // Error state for movies

  useEffect(() => {
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=1`
      : `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1`;

    fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDZkYjJhNjMwMTE0OGM1NjlhNjM3NTU1NmJhZmM1OSIsIm5iZiI6MTc0NTIxMTMyNi4xMTM5OTk4LCJzdWIiOiI2ODA1Y2ZiZWUzZmFjMmY5MDI4OWZlMzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wVy0H9p6dJcZCU9aXFpN3yP5NEiYKMOYwedV-2WBGh4',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [searchQuery]);

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>Error fetching movies: {error.message}</p>;
  }

  return (
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={movie.title}
              />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p>IMDb Rating: {movie.vote_average}</p>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
  );
};

export default Movies;
