import React, { Component } from "react";
import logo from '../logo.svg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import '../assets/carousel.css';

class HomeCarousel extends Component{

    constructor(){
        super();
        this.state = {
            pictures:[] ,
            usernames:[] 
        } 
    }
    componentDidMount(){
        fetch('https://randomuser.me/api/?results=7')
          .then(results => {
           return results.json()
          })
          .then(data => {
            let pictures = data.results.map((pic) => {
              return (
                <div className = "userThumbResults" key = {pic.results}>
                  <img className = "userPicThumb" src = {pic.picture.thumbnail} />
                 <h3 className = "featUserNames">{pic.name.first} {pic.name.last}</h3>
                  <h3 className = "picTitle">Title</h3>
                </div>
              )
            })
            this.setState({
              pictures: pictures
            })
            console.log("state", this.state.pictures)
          })
      }
    render(){
    return(
    <Carousel autoPlay>
        

        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[0]}</div>
            </div>
    </div>
    <div>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[1]}</div>
            </div>
    </div>
    <div>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[2]}</div>
            </div>
    </div>
    <div>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[3]}</div>
            </div>
    </div>
    <div>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[4]}</div>
            </div>
    </div>
    <div>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[5]}</div>
            </div>
    </div>
    <div>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[6]}</div>
            </div>
    </div>

    
    
    </Carousel>
        
    );
    }
}
export default HomeCarousel;

