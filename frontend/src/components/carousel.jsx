import React from "react";
import logo from '../logo.svg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import '../assets/carousel.css';

function HomeCarousel(){
    return(
  <Carousel autoPlay>
     

    <div>
    <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 1</p>
    </div>
    <div>
    <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 2</p>
    </div>
    <div>
    <img src={logo}  className="App-logo" alt="logo" />
      <p className="legend">Legend 3</p>
    </div>
    <div>
    
    <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 5</p>
    </div>
    <div>
    <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 6</p>
    </div>
    <div>
    <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 7</p>
    </div>
    <div>
    <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 8</p>
    </div>
    <div>
    <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 9</p>
    </div>
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 10</p>
    </div>
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 11</p>
    </div>
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 12</p>
    </div>
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 13</p>
    </div>
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <p className="legend">Legend 14</p>
    </div>
  </Carousel>
);
}
export default HomeCarousel;

