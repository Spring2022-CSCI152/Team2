import '../assets/account.css';
import React, { useState, useEffect } from "react";
import ImageList from './ImageList.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';


function UserAccount() {
    
    const [images, setImages] = useState([]);
    
    const [profileData, setProfile] = useState({
        profileimg: '',
        name: '',
        bio: '',
        instagram: '',
        twitter: ''});

    const navigate = useNavigate();  
    // get userid from link
    const { userid } = useParams();

    async function getUserProfile() {
        // Get loggedin data
        // First find a logged in user
        const loggedInRes = await axios.get("http://localhost:5000/loggedIn");
        const loggedIn = loggedInRes.data;
        // Assign loggedin user's info. Should be undefined if not user found.
        const setUser = await axios.get('http://localhost:5000/setuser');
        const loggedUser = setUser.data;

        // If logged in and the user id is the same as the param id. Send to own account page.
        if(loggedIn === true && userid === loggedUser){
            console.log("Same User. Navigating to logged in account page.");
            navigate('/account');
        }
        // Else continue onto the browsed profile and assign userProfile with getProfile data
        else {
            console.log("Different User. Continue.");
            // Get Profile data based on userId param
            await axios.get(`http://localhost:5000/account/${userid}`).then((res) => {
                const data = {
                    profileimg: res.data.user.profileimg,
                    name: res.data.user.name,
                    bio: res.data.user.userbio,
                    instagram: res.data.user.socials.instagram,
                    twitter: res.data.user.socials.twitter
                }
                // Set profile data and profile collections
                setProfile(data);
                setImages(res.data.user.collectionArray.map(x => x.imgURL));
            });
            
        }
    }

    useEffect(()  => {
        getUserProfile();
    }, []);


    return (
        <>
        {profileData ? 

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
                
                
            </div>

            <div id="tableinfo">
            <Link to={"/gallery"} className="galleryButton"> Gallery </Link>
                {/* <table> */}
                <ImageList images={images} />
                
                    

                {/* </table> */}
            </div>
            </div>

        
         : <h1>Loading...</h1>
            }
        </>

    );
}

export default UserAccount;