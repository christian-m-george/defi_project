import React from "react";
import "./App.css";
import About from "./components/about/About";
import Banner from "./components/banner/Banner";
import { Navbar } from "./components/nav/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Defi from "./components/defi/Defi";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/defi" element={<Defi />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
