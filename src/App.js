import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import MovieDetails from './components/MovieDetails'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
