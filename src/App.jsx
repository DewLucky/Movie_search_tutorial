import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import SearchIcon from "../public/search-line-icon.svg";
import "./App.css";
const API_KEY = import.meta.env.VITE_API_KEY;

const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`;
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);
  
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Please Enter a Movie name</h2>
        </div>
      )}
    </div>
  );
};

export default App;