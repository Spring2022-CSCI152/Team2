import axios from "axios";
import React, { useEffect } from "react";
import * as ReactDOM from 'react-dom';
import '../assets/gallery.css';
import Navbar from './Navbar.jsx';


const { useState } = React;

  
const images=[];


function Gallery1 () {
  const [profileData, setProfileData] = useState({
    profileimg: '',
    name: '',
    bio: '',
    instagram: '',
    twitter: ''});

useEffect(() => {
    axios.get("http://localhost:5000/profileData").then((res) => {
        const data = {
            profileimg: res.data.profileimg,
            name: res.data.name,
            bio: res.data.userbio,
            instagram: res.data.socials.instagram,
            twitter: res.data.socials.twitter
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


function ImageGallery() {
  const [imageToShow, setImageToShow] = useState("");
  const [imageToShowName, setImageToShowName] = useState("");
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);
  const [urls, setUrls] = useState([]);
  const [imageNames, setImageNames] = useState([]);

  useEffect(() => {
    // axios request to get images
    axios.get("http://localhost:5000/gallery").then((res) => {
      //console.log(res.data);
      setUrls(res.data);
    });

    // axios request to get image names
    axios.get("http://localhost:5000/galleryNames").then((res) => {
      //console.log(res.data);
      setImageNames(res.data);
    });
  }, []);

  //looping through our images array to create img elements
  const imageCards = urls.map((image, index) => (
    <img className="image-card" key={"image" + index} src={image} alt="image" onClick={() => showImage(image)}  />
  ));

  // delete image from db
  const deleteImage = (image) => {
    const imageURL = image;
    axios.post("http://localhost:5000/deleteImage", { imgURL: imageURL }).then(() => {
      console.log("image deleted");
      setUrls(urls.filter((url) => url !== image));
    });
  }

  //lightbox
  const showImage = (image) => {
    setImageToShow(image);
    setImageToShowName(imageNames[urls.indexOf(image)]);
    setLightBoxDisplay(true);
  };


  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };


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
          <div></div>
          <div id = "des"> 
            <img id="lightbox-img" src={imageToShow}></img>
            <p5 className = "p5"> {imageToShowName}</p5>
            <button className = "deleteImageButton" onClick={() => deleteImage(imageToShow)}>Delete Image</button>
          </div>
          <div></div>
        </div>
       : ""
      }
    </>
  );
}

//ReactDOM.render(<Gallery1 />, document.getElementById("root"));

export default Gallery1;