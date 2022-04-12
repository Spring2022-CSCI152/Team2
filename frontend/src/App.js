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
import SearchPage from './components/searchPage.jsx';
import About from './components/about.jsx';
import Account from './components/account.jsx';
import Gallery1 from './components/gallery.jsx';
import './assets/featUsers.css';

import React, { useState, useContext } from 'react';
import AuthContext from './context/authContext';
import {AuthContextProvider} from './context/authContext';
import Router from './Router';
import axios from "axios";
axios.defaults.withCredentials = true;







function App() {
  
  
  return (
  <AuthContextProvider>
    <Router />
  </AuthContextProvider>
  );
}

export default App;