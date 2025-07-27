import React, { useEffect, useState } from 'react';
import './App.css';

const TVShows = ({ searchQuery }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for TV shows
  const [error, setError] = useState(null); // Error state for TV shows

  useEffect(() => {
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&language=en-US&page=1`
      : `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`;

    fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDZkYjJhNjMwMTE0OGM1NjlhNjM3NTU1NmJhZmM1OSIsIm5iZiI6MTc0NTIxMTMyNi4xMTM5OTk4LCJzdWIiOiI2ODA1Y2ZiZWUzZmFjMmY5MDI4OWZlMzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wVy0H9p6dJcZCU9aXFpN3yP5NEiYKMOYwedV-2WBGh4',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setShows(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [searchQuery]);

  if (loading) {
    return <p>Loading TV shows...</p>;
  }

  if (error) {
    return <p>Error fetching TV shows: {error.message}</p>;
  }

  return (
    <div className="tvshows">
      <h1>Popular TV Shows</h1>
      <div className="movies-list">
        {shows.length > 0 ? (
          shows.map((show) => (
            <div key={show.id} className="movie">
              <img
                src={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w200${show.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={show.name}
              />
              <div className="movie-details">
                <h3>{show.name}</h3>
                <p>IMDb Rating: {show.vote_average}</p>
                <p>{show.overview}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No TV shows found.</p>
        )}
      </div>
    </div>
  );
};

export default TVShows;
