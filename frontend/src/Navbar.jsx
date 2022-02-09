import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return ( 
        <div className="navContainer">
            <div className="leftSide">
                <div className="logoContainer">
                    <img src="/logo192.png" alt="logo" className="logo"/>
                </div>
                <div className="searchBar">
                    <input type="text" placeholder="Search" className="searchInput"/>
                </div>
            </div>
            <div className="rightSide">
                <button className="aboutButton"> About </button>
                <button className="loginButton"> Login </button>
                <div className="profilePictureContainer">
                    <img src="/placeholderPFP.png" alt="profile" className="profilePicture"/>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;