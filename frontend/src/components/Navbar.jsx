import React, { useContext, useState } from 'react';
import '../assets/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
// AuthContext needed to check if user logged in
// Note: React, { useContext } from 'react'; is needed
import AuthContext from '../context/authContext';
import LogOutBtn from './logout';



const Navbar = () => {
    //search
    const [query, setQuery] = useState("");

    // loggedIn value to check if user is logged in
    const { loggedIn } = useContext(AuthContext);

    const isMobile = useMediaQuery({ maxWidth: 550 });
    return ( 
        <div className="navContainer">
            <div className="leftSide">
                <div className="logoContainer">
                    <Link to="/" className="homeButton">
                        <img src="/NFTlogo3.png" alt="logo" className="logo"/>
                    </Link>
                </div>
                <div className="searchBar">
                    <form action='/search' method='GET' className="searchForm">
                        <input type="text" placeholder="Search" className="searchInput" name='searchField'/>
                        <button className="searchButton" >
                            <FontAwesomeIcon icon={faSearch} />
                            {/* <img src="/search.png" alt="searchImage" height="100%"/> */}
                        </button>
                    </form>
                </div>
            </div>

            <div className="rightSide">
                {!isMobile && 
                    <React.Fragment>
                        <Link to={"/about"} className="aboutButton"> About </Link>

                        {/* LoggedIn example with login route*/}
                        {loggedIn === false && ( 
                            <>
                                <Link to={"/login"} className="loginButton"> Login </Link>

                                {/* Account Component */}
                                <div className="profilePictureContainer">
                                    <Link to={"/registration"} className="accountButton"> 
                                        <FontAwesomeIcon icon={faUser} />
                                        {/* <img src="/placeholderPFP.png" alt="profile" className="profilePicture"/> */}
                                    </Link>
                                </div>
                            </>
                        )}

                        {loggedIn === true && (
                            <>
                                <LogOutBtn></LogOutBtn>

                                {/* Alerts Component */}
                                <div className="profilePictureContainer">
                                    <Link to={"/alerts/"} className="alertButton"> 
                                        <FontAwesomeIcon icon={faBell} />
                                        {/* <img src="/placeholderPFP.png" alt="profile" className="profilePicture"/> */}
                                    </Link>
                                </div>

                                {/* Account Component */}
                                <div className="profilePictureContainer">
                    
                                    <Link to={"/account"} className="accountButton"> 
                                        <FontAwesomeIcon icon={faUser} />
                                        {/* <img src="/placeholderPFP.png" alt="profile" className="profilePicture"/> */}
                                    </Link>
                                </div>
                            </>
                        )}
                    </React.Fragment>
                }
                {isMobile && 
                    <React.Fragment>
                        <FontAwesomeIcon icon={faBars} className="hamburger" />
                    </React.Fragment>
                }
                
            </div>
        </div>
     );
}
 
export default Navbar;