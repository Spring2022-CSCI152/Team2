import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="navContainer">
            <div className="leftSide">
                <div className="logoContainer">
                    <Link to="/" className="homeButton">
                        <img src="/logo192.png" alt="logo" className="logo"/>
                    </Link>
                </div>
                <div className="searchBar">
                    <input type="text" placeholder="Search" className="searchInput"/>
                    <button className="searchButton">
                        <FontAwesomeIcon icon={faSearch} />
                        {/* <img src="/search.png" alt="searchImage" height="100%"/> */}
                    </button>
                </div>
            </div>
            <div className="rightSide">
                <Link to="/about" className="aboutButton"> About </Link>
                <Link to="/login" className="loginButton"> Login </Link>
                {/* <button className="aboutButton"> About </button> */}
                {/* <button className="loginButton"> Login </button> */}
                <div className="profilePictureContainer">
                    <FontAwesomeIcon icon={faUser} />
                    {/* <img src="/placeholderPFP.png" alt="profile" className="profilePicture"/> */}
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;