import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeaturedUsers from "./components/featuredUsers.jsx";
import Carousel from "./components/carousel.jsx";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Dropzone from './components/dropzone.jsx';
import Login from './components/login.jsx';
import AlertsPage from './components/alertsPage.jsx';
import Registration from './components/registration.jsx';
import ImageSimilarity from './components/ImageSimilarity';
import ImageCluster from './components/imageCluster';
import SearchPage from './components/searchPage.jsx';
import About from './components/about.jsx';
import Account from './components/account.jsx';
import EditAccount from './components/editAccount.jsx';
import UserAccount from './components/userAccount';
import Gallery1 from './components/gallery.jsx';
import UserGallery from './components/userGallery.jsx';
import './assets/featUsers.css';

import React, { useState, useContext } from 'react';
import AuthContext from './context/authContext';
import axios from "axios";
axios.defaults.withCredentials = true;


function Router() {
    const { loggedIn } = useContext(AuthContext);
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
            {loggedIn === false && ( 
                <>
                <Route path= {"/login"} element={
                    <div className="App-body-login">
                    <Login />
                    </div>
                }/>

                <Route path = {"/registration"} element = {
                    <div className ="App-body-registration">
                    <Registration />
                    </div>
                }/>

                </>
            )}

            {loggedIn === true && (
                <>
                    <Route path="/alerts/" element={
                        <div className="App-body-alerts">
                    
                        <br></br>
                        <AlertsPage></AlertsPage>
                        
                        
                        
                        </div>
                    } />

                    <Route exact path= {"/account"} element={
                        //<div className = "App-body">
                        <div className="App-body">
                        <Account/>
                                
                        </div>
                        // </div>
                    }/>

                    <Route exact path= {"/editAccount"} element={
                      <div className = "App-body">
                      <EditAccount/>
                      </div>
                    }/>
                    
                </>
            )}

          <Route path="/" element={
            <div className="App-body">
              <br></br>
              <Carousel/>
              <FeaturedUsers />
            </div>
          } />


          <Route path= {"/account/:userid"} element={
                        //<div className = "App-body">
                        <div className="App-body">
                        <UserAccount/>
                                
                        </div>
                        // </div>
                    }/>
          
          
          <Route path="/imgSim" element={
            <div className="App-body">
              <ImageSimilarity/>
            </div>
          } />

          <Route path="/imgCluster" element={
            <div className="App-body">
              <ImageCluster/>
            </div>
          } />
          
          <Route path="/search/" element={
            <div className="App-body-alerts">
              <br></br>
              <SearchPage></SearchPage>
            </div>
          } 
          />

          <Route path= {"/about"} element={
            <div className="App-body-about">
              <About/>
              <FeaturedUsers />
            </div>
          }/>

          <Route path= {"/gallery"} element={
            <div className="App-body">
              <Gallery1 />
            </div>
          }/>

          <Route path= {"/gallery/:userid"} element={
            <div className="App-body">
              <UserGallery/>
            </div>
          }/>
        
          <Route path="*" element={ // This is the catch-all route
            <div className="App-body">
              <a href="/" style={{textDecoration: "none", color: "#61dafb"}}>Go back to home</a>
            </div>
          }/>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;