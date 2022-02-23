import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeaturedUsers from "./components/featuredUsers.jsx";
import Carousel from "./components/carousel.jsx";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/login.jsx';
import About from './components/about.jsx';
import './assets/featUsers.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path= {"/login"} element={
            <div className="App-body-login">
              <Login />
            </div>
          }/>

          <Route path="/" element={
            <div className="App-body">
            {/* < img src={logo} className="App-logo" alt="logo" /> */}
            <br></br>
             <Carousel/>
              <FeaturedUsers />
              
            </div>
          } />

          <Route path= {"/about"} element={
            // <div className = "App-body">
            <div className="App-body-about">
              <About/>
              <FeaturedUsers />
            </div>
            // </div>
          }/>
          
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