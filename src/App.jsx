import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import Traveler from './pages/Traveler';
import Extras from './pages/Extras';
import Seat from './pages/Seat';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/traveler" element={<Traveler />} />
        <Route path="/extras" element={<Extras />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
