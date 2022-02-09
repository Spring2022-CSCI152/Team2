import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return ( 
        <div className="navContainer">
            <div className="leftSide">
                <div className="logoContainer">
                    <img src="/logo192.png" alt="logo" className="logo"/>
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
                <button className="aboutButton"> About </button>
                <button className="loginButton"> Login </button>
                <div className="profilePictureContainer">
                    <FontAwesomeIcon icon={faUser} />
                    {/* <img src="/placeholderPFP.png" alt="profile" className="profilePicture"/> */}
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;