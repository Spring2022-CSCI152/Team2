import React from 'react';
import '../assets/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
    const isMobile = useMediaQuery({ maxWidth: 550 });
    return ( 
        <div className="navContainer">
            <div className="leftSide">
                <div className="logoContainer">
                    <Link to="/" className="homeButton">
                        <img src="/logo192.png" alt="logo" className="logo"/>
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
                        <Link to={"/login"} className="loginButton"> Login </Link>
                        

                    </React.Fragment>
                }
                {isMobile && 
                    <React.Fragment>
                        <FontAwesomeIcon icon={faBars} className="hamburger" />
                    </React.Fragment>
                }
                <div className="alertsContainer">
               
                <Link to={"/alerts/"} className="alertButton"> <FontAwesomeIcon icon={faBell} />  </Link>
                    {/* <img src="/placeholderPFP.png" alt="profile" className="profilePicture"/> */}
                </div>
                <div className="profilePictureContainer">
                
                    <FontAwesomeIcon icon={faUser} />
                    {/* <img src="/placeholderPFP.png" alt="profile" className="profilePicture"/> */}
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;