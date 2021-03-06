import '../assets/account.css';
import React, { useCallback, useState, useContext, useEffect } from "react";
import Dropzone from './dropzone.jsx';
import ImageList from './ImageList.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
import cuid from "cuid";
import axios from 'axios';
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function Account() {
    const [images, setImages] = useState([]);

    useEffect (() => {
        axios.get('http://localhost:5000/gallery').then(res => { setImages(res.data) });
    }, []);

      const onDrop = useCallback(async acceptedFiles => {
        // Loop
        acceptedFiles.map(async file => {
            
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            let data = new FormData();
            data.append('myImage', file);
            await axios.post('http://localhost:5000/collections', data, config).then(async res => {
                console.log(res.data);

            
                const reader = new FileReader();
                
                reader.onload = function(e) {
                     
                    setImages(prevState => [
                    ...prevState,
                    { id: cuid(), src: res.data }
                    ]);
                };
                
                reader.readAsDataURL(file);
                
                await axios.get('http://localhost:5000/gallery').then(res => { setImages(res.data) });
                return file;
            });
        });
    }, []) ;

    const [profileData, setProfileData] = useState({
        profileimg: '',
        name: '',
        bio: '',
        instagram: '',
        twitter: ''});

    useEffect(() => {
        axios.get("http://localhost:5000/profileData").then((res) => {
            console.log(res);
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
        <><main className="Account">
           
           
        </main>
        
        <div className="accounth">

                <div className='accountInfo'>
                    <div id="profilePic">
                        <img id="profileImg" src={profileData.profileimg}></img>
                    </div>

                    <div className='usernameAndSocials'>
                        <div id="profileCont">
                            <p>
                                {profileData.name}
                            </p>
                        </div>

                        <div className='socialMedia'>
                            <div id="profileInsta">
                                <button className="socialButton" onClick={() => window.open("https://instagram.com/" + profileData.instagram, "_blank")}>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </button>
                            </div>

                            <div id="profileTwitter">
                                <button className="socialButton" onClick={() => window.open("https://twitter.com/" + profileData.twitter, "_blank")}>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="profileBio">
                        <p> {profileData.bio} </p>
                    </div>
                    
                    <div id="profileDrag">
                        <Dropzone onDrop={onDrop} accept={"image/*"} />
                    </div>

                    <div id="editButton">
                        
                        <Link to={"/editAccount"} className="editButton"> Edit Profile</Link>
                        {/* <input type = "button" value ="Edit Profile"></input> */}
                    </div>
                    
                    
                </div>

                <div id="tableinfo">
                <Link to={"/gallery"} className="galleryButton"> Gallery </Link>
                    {/* <table> */}
                    <ImageList images={images} />
                    
                        

                    {/* </table> */}
                </div>
            </div></>

    );
}

export default Account;