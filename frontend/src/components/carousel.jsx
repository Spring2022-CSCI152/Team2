import React, { Component } from "react";
import logo from '../logo.svg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import '../assets/carousel.css';
import axios from "axios";

class HomeCarousel extends Component{

    constructor(){
        super();
        this.state = {
            pictures:[] ,
            imgUrls: []
        } 
    }
    componentDidMount(){
        // fetch('https://randomuser.me/api/?results=7')
        axios.get('app/carousel')
          .then(results => {
            let pictures = results.data.map((pic) => {
              return (
                <div className = "userThumbResults" key = {pic._id}>
                  <img className = "userPicThumb" src = {pic.profileimg} />
                 <h3 className = "featUserNames">{pic.name}</h3>
                  <h3 className = "picTitle">{pic.collectionArray[0].imgName}</h3>
                </div>
              )
            })
            this.setState({
                // set pictures to the imgurls from the database
              pictures: pictures,
              imgUrls: results.data.map(x => x.collectionArray[0].imgURL)
            })
          })
      }
    render(){
    return(
    <Carousel autoPlay>
        

        <div>
            <img src={this.state.imgUrls[0]} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[0]}</div>
            </div>
    </div>
    <div>
            <img src={this.state.imgUrls[1]} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[1]}</div>
            </div>
    </div>
    <div>
            <img src={this.state.imgUrls[2]} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[2]}</div>
            </div>
    </div>
    <div>
            <img src={this.state.imgUrls[3]} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[3]}</div>
            </div>
    </div>
    <div>
            <img src={this.state.imgUrls[4]} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[4]}</div>
            </div>
    </div>
    <div>
            <img src={this.state.imgUrls[5]} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[5]}</div>
            </div>
    </div>
    <div>
            <img src={this.state.imgUrls[6]} className="App-logo" alt="logo" />
            <div className="legend">
                <div className = "userThumb">{this.state.pictures[6]}</div>
            </div>
    </div>

    
    
    </Carousel>
        
    );
    }
}
export default HomeCarousel;

