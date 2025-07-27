import React, { useEffect, useState } from 'react';
import './App.css';

const Home = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(28);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDZkYjJhNjMwMTE0OGM1NjlhNjM3NTU1NmJhZmM1OSIsIm5iZiI6MTc0NTIxMTMyNi4xMTM5OTk4LCJzdWIiOiI2ODA1Y2ZiZWUzZmFjMmY5MDI4OWZlMzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wVy0H9p6dJcZCU9aXFpN3yP5NEiYKMOYwedV-2WBGh4'
      }
    })
      .then(res => res.json())
      .then(data => setGenres(data.genres))
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  useEffect(() => {
    let url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=1`
      : `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&language=en-US&page=1`;

    fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDZkYjJhNjMwMTE0OGM1NjlhNjM3NTU1NmJhZmM1OSIsIm5iZiI6MTc0NTIxMTMyNi4xMTM5OTk4LCJzdWIiOiI2ODA1Y2ZiZWUzZmFjMmY5MDI4OWZlMzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wVy0H9p6dJcZCU9aXFpN3yP5NEiYKMOYwedV-2WBGh4'
      }
    })
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(error => console.error('Error fetching movies:', error));
  }, [searchQuery, selectedGenre]);

  return (
    <div className="home">      
      {/* Genre Selector */}
      <div className="genre-selector">
        {genres.length > 0 ? (genres.map(genre => (
            <button key={genre.id} className={selectedGenre === genre.id ? 'selected' : ''} onClick={() => setSelectedGenre(genre.id)}>{genre.name}</button>
          ))) : (<p>Loading genres...</p>)}
      </div>

      {/* Movie List */}
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movie" key={movie.id}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movie.title}
              />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>IMDb Rating: {movie.vote_average}</p>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
