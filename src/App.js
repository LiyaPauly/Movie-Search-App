import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './components/Home';
import MovieDetails from './components/MovieDetails'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter basename="/movie-search-app">
      <Routes>
        <Route exact path="/movie-search-app" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
