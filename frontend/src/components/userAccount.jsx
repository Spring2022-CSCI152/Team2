import '../assets/account.css';
import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from '../context/authContext';
import axios from 'axios';


function UserAccount() {
    const { loggedIn } = useContext(AuthContext);
    const { userInfo } = useContext(AuthContext);
    const [userProfile, setProfile] = useState(null);
    const navigate = useNavigate();  
    // get userid from link
    const { userid } = useParams();
    //console.log(userid);
    //console.log(loggedIn);

    async function getUserProfile() {
        const setUser = await axios.get(`http://localhost:5000/account/${userid}`);
        if(loggedIn === true && userInfo.id === userid){
            navigate('/account');
        }
        else {
            console.log(setUser.data);
            setProfile(setUser.data);
        }
    }

    useEffect(()  => {
        /*if(loggedIn === true && userInfo.id === userid){
            navigate('/account');
        }
        else {
            fetch(`/user/${userid}`)
            .then(res => res.json())
            .then(result => { 
               console.log(result) 
               setProfile(result);
            });
        }*/
        getUserProfile();
    }, []);


    return (
        <>
        <main className="Account">
           
           
        </main>
        
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
            </div></>

    );
}

export default UserAccount;