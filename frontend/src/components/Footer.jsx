import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';

import '../Footer.css';

const Footer = () => {
    return (
    <div className='contactContainer'>
        <p className='contactText'> Contact Us </p>
        <div className='contactButtons'>
            <button className='contactButton'>
                <a href="https://discord.gg/dmsJaNhwbp" target="_blank">
                    <FontAwesomeIcon icon={faDiscord} />
                </a>
            </button>
            <button className='contactButton'>
                <a href="https://github.com/Spring2022-CSCI152/Team2/issues" target="_blank">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </button>
        </div>
    </div>
    );
}
 
export default Footer;