import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


import Navbar from './Navbar.jsx';

function App() {

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />
        <p> Yo {0} </p>
      </header>
    </div>
  );
}

export default App;
