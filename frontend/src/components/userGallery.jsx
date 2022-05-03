import axios from "axios";
import React, { useEffect } from "react";
import * as ReactDOM from 'react-dom';
import '../assets/gallery.css';
import Navbar from './Navbar.jsx';
import { useParams } from "react-router-dom";


    const { useState } = React;

//IMAGES
//you can also import a local file, the syntax would look like:
//import image1 from './images/imagename.jpg'
//const image1 =
//  "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80";
//const image2 =
//  "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80";
//const image3 =
//  "https://images.unsplash.com/photo-1447684808650-354ae64db5b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80";
//const image4 =
//  "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2110&q=80";
//const image5 =
//  "https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2301&q=80";
//const image6 =
//  "https://images.unsplash.com/photo-1500694216671-a4e54fc4b513?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2092&q=80";


//IMAGE ARRAY
//const images = [image1, image2, image3, image4, image5, image6];
const images = []

//MAIN APP COMPONENT
function UserGallery () {
  const { userid } = useParams();
  const [profileData, setProfileData] = useState({
    profileimg: '',
    name: '',
    bio: '',
    instagram: '',
    twitter: ''});

useEffect(() => {
  axios.get(`http://localhost:5000/account/${userid}`).then((res) => {
    const data = {
        profileimg: res.data.user.profileimg,
        name: res.data.user.name,
        bio: res.data.user.userbio,
        instagram: res.data.user.socials.instagram,
        twitter: res.data.user.socials.twitter
    }
        console.log(data);
        setProfileData(data);
    });
}, []);


  return (
    <div className="App-body">
      <h3> {profileData.name}'s Gallery </h3>
      

      <ImageGallery />
    </div>
  );
}


//MAIN LIGHTBOX
//Holds Images Cards and Lightbox
//this is where all of our logic will live
function ImageGallery() {
  const [imageToShow, setImageToShow] = useState("");
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);
  const [urls, setUrls] = useState([]);
  // get userid from link
  const { userid } = useParams();

  useEffect(() => {
    // axios request to get images
    axios.get(`http://localhost:5000/gallery/${userid}`).then((res) => {
      //console.log(res.data);
      setUrls(res.data);
    });
  }, []);
  
  //looping through our images array to create img elements
  const imageCards = urls.map((image, index) => (
    <img className="image-card" key={"image" + index} src={image} alt="image" onClick={() => showImage(image)} />
  ));

  //function to show a specific image in the lightbox, amd make lightbox visible
  const showImage = (image) => {
    setImageToShow(image);
    setLightBoxDisplay(true);
  };

  //hide lightbox
  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  //show next image in lightbox
  const showNext = (e) => {
    e.stopPropagation();
    let currentIndex = images.indexOf(imageToShow);
    if (currentIndex >= images.length - 1) {
      setLightBoxDisplay(false);
    } else {
      let nextImage = images[currentIndex + 1];
      setImageToShow(nextImage);
    }
  };

  //show previous image in lightbox
  const showPrev = (e) => {
    e.stopPropagation();
    let currentIndex = images.indexOf(imageToShow);
    if (currentIndex <= 0) {
      setLightBoxDisplay(false);
    } else {
      let nextImage = images[currentIndex - 1];
      setImageToShow(nextImage);
    }
  };
  
  return (
    <>
      <div>{imageCards}</div>
      
      {
        lightboxDisplay ? 
        <div id="lightbox" onClick={hideLightBox}>
          <button1 onClick={showPrev}>⭠</button1>
          <div id = "des"> 
          <img id="lightbox-img" src={imageToShow}></img>
          <p5 className = "p5"> NFT</p5></div>
          <button1 onClick={showNext}>⭢</button1>
        </div>
       : ""
      }
    </>
  );
}

//ReactDOM.render(<Gallery1 />, document.getElementById("root"));

export default UserGallery;