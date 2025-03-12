import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "../styles/MovieDetails.css";


const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [theme, setTheme] = useState("dark"); 

  const apiKey = "18aba0a4473fcb669e15e4f3a451b60f";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos`
        );
        const similarResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
        );
        setMovieDetails(movieResponse.data);
        setSimilarMovies(similarResponse.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  const cast = movieDetails?.credits?.cast || [];
  const trailerKey = movieDetails?.videos?.results?.[0]?.key;

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 11,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    focusOnSelect: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "Light" : "dark");
  }; 


  return (
    <div className={`movie-details-container ${theme}`}>

      <button className="back-button" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>

      <button className="theme-toggle-button" onClick={toggleTheme}>
        Switch to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>

      <div className="movie-header">
        <img
          className="movie-image"
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
        <div className="movie-info">
          <h1 className="movie-title">{movieDetails.title}</h1>
          <p className="release-date">
            Released: {new Date(movieDetails.release_date).toLocaleDateString()}
          </p>
          <p className="movie-description">{movieDetails.overview}</p>
          <div className="movie-rating">
            <span>⭐ {movieDetails.vote_average}</span>
          </div>
          <div className="movie-cast">
            <ul>
              {cast.slice(0, 3).map((actor) => (
                <li key={actor.cast_id}>
                  {actor.name} as {actor.character}
                </li>
              ))}
            </ul>
          </div>
          <div className="movie-buttons">
            <button className="play-button" onClick={() => setIsPlaying(true)}>
              Play Movie
            </button>
            {trailerKey && !isPlaying && (
              <button className="trailer-button" onClick={() => setIsPlaying(true)}>
                Watch Trailer
              </button>
            )}
          </div>
        </div>
      </div>

      {isPlaying && trailerKey && (
        <div className="video-container">
          <button
            className="close-video-button"
            onClick={() => setIsPlaying(false)}
          >
            &times;
          </button>
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Movie Trailer"
          ></iframe>
        </div>
      )}

      <div className="similar-movies">
        <h2>Similar Movies</h2>
        <Slider {...settings}>
          {similarMovies.map((movie) => (
            <div key={movie.id} className="similar-movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieDetails;
