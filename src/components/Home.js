import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import logo from "../assets/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "18aba0a4473fcb669e15e4f3a451b60f"; 

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log(query);  
    if (query.length >= 3) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        )
        .then((response) => {
          console.log(response.data.results); 
          setMovies(response.data.results);
        })
        .catch((error) => console.log(error));
    } else {
      setMovies([]);
    }
  }, [query]);

  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src={`${process.env.PUBLIC_URL}/background.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Welcome to Filmio Search</h1>
        <p className="subtitle">Click on search to start</p>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for movies by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {query.length >= 3 && (
          <div className="search-results">
            <h2>Search Results</h2>
            <div className="movie-list">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <div className="movie-card">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <h3>{movie.title}</h3>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
