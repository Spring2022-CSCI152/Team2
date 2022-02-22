import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/login.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path= {"/login"} element={
            <Login />
          }/>

          <Route path="/" element={
            <div className="App-body">
              <img src={logo} className="App-logo" alt="logo" />
              <p> Yo {0} </p>
            </div>
          } />

          
          
          <Route path="*" element={ // This is the catch-all route
            <div className="App-body">
              <a href="/" style={{textDecoration: "none", color: "#61dafb"}}>Go back to home</a>
            </div>
          } />
        </Routes>
      </div>
      <Footer />
  </BrowserRouter>
  );
}

export default App;