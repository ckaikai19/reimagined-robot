import React from 'react';
import Home from './pages/Home';
import Details from "./pages/Details";
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


function App() {
  // const location = useLocation();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id"  element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
