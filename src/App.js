import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import MovieDetails from './components/MovieDetails'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter basename="/movie-search-app">
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home page route */}
        <Route path="/movie/:id" element={<MovieDetails />} /> {/* Movie details page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
