import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeaturedUsers from "./components/featuredUsers.jsx";
import Carousel from "./components/carousel.jsx";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/login.jsx';
import AlertsPage from './components/alertsPage.jsx';
import Registration from './components/registration.jsx';
import SearchPage from './components/searchPage.jsx';
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
            <Route path = {"/registration"} element={
              <div className ="App-body-registration">
                <Registration/>
              </div>

            }/>
            
          

          <Route path = {"/registration"} element = {
            <div className ="App-body-registration">
              <Registration />
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
          <Route path="/alerts/" element={
            <div className="App-body-alerts">
           
            <br></br>
            <AlertsPage></AlertsPage>
            
            
              
            </div>
          } />
          <Route path="/search/" element={
            <div className="App-body-alerts">
           
            <br></br>
            <SearchPage></SearchPage>
            
            
              
            </div>
          } 
          />
          
          
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