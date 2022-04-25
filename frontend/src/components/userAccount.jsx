import '../assets/account.css';
import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../context/authContext';


function UserAccount() {
    const [userProfile, setProfile] = useState(null);
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
        // Get Profile data based on userId param
        const getProfile = await axios.get(`http://localhost:5000/account/${userid}`);
        
        // If logged in and the user id is the same as the param id. Send to own account page.
        if(loggedIn === true && userid === loggedUser.id){
            console.log("Same User. Navigating to logged in account page.");
            navigate('/account');
        }
        // Else continue onto the browsed profile and assign userProfile with getProfile data
        else {
            console.log("Different User. Continue.");
            // Can now add {userProfile.user.name} etc etc to page
            setProfile(getProfile.data);
        }
    }

    useEffect(()  => {
        getUserProfile();
    }, []);


    return (
        <>
        {userProfile ? 

           <div className="accounth">

            <div className='accountInfo'>
                <div id="profilePic">
                    <img id="profileImg" src="/logo192.png"></img>
                </div>

                <div className='usernameAndSocials'>
                    <div id="profileCont">
                        <p>{userProfile.user.name}</p>
                    </div>

                    <div className='socialMedia'>
                        <div id="profileInsta">
                            <button className="socialButton">
                                <FontAwesomeIcon icon={faInstagram} />
                            </button>
                        </div>

                        <div id="profileTwitter">
                            <button className="socialButton">
                                <FontAwesomeIcon icon={faTwitter} />
                            </button>
                        </div>
                    </div>
                </div>

                <div id="profileBio">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, explicabo corporis? Sequi repellendus expedita, veritatis nam sed neque quisquam, repellat tempore et possimus perspiciatis sapiente! Quisquam incidunt mollitia nulla aliquid.
                    </p>
                </div>
                
            </div>

            <div id="tableinfo">
            <Link to={"/gallery"} className="galleryButton"> Gallery </Link>
                <table>
                
                
                    

                </table>
            </div>
            </div>

        
         : <h1>Loading...</h1>
            }
        </>

    );
}

export default UserAccount;