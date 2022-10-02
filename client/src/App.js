import React from 'react';
import Home from './pages/Home';
import Details from "./pages/Details";
import './styles/App.css';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


function App() {
  // const location = useLocation();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Details />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
