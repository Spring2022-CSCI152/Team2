import React from 'react';
import '../assets/account.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


function account() {
    return (
        <div className = "accounth">

            <div className='accountInfo'>
                <div id ="profilePic" >
                    <img id="profileImg" src="/logo192.png" ></img>
                </div>

                <div className='usernameAndSocials'>
                    <div id = "profileCont">
                        <p>
                            Username
                        </p>
                    </div>

                    <div className='socialMedia'>
                        <div id = "profileInsta">
                        <button className="socialButton" >
                                <FontAwesomeIcon icon={faInstagram} />
                        </button>
                        </div>

                        <div id = "profileTwitter">
                        <button className="socialButton" >
                                <FontAwesomeIcon icon={faTwitter} />
                        </button>
                        </div>
                    </div>
                </div>

                <div id ="profileBio">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, explicabo corporis? Sequi repellendus expedita, veritatis nam sed neque quisquam, repellat tempore et possimus perspiciatis sapiente! Quisquam incidunt mollitia nulla aliquid.
                    </p> 
                </div>

                <div id ="profileDrag">
                    <p>
                        Upload (Drag and Drop)
                    </p>
                </div>
            </div>

            <div id = "tableinfo">
            <table>
            <tr> 
                <td><img src="/logo192.png" ></img></td>
                <td><img src="/logo192.png" ></img></td>
                <td><img src="/logo192.png" ></img></td>
            </tr>
            <tr> 
                <td><img src="/logo192.png" ></img></td>
                <td><img src="/logo192.png" ></img></td>
                <td><img src="/logo192.png" ></img></td>
            </tr>
            <tr> 
                <td><img src="/logo192.png" ></img></td>
                <td><img src="/logo192.png" ></img></td>
                <td><img src="/logo192.png" ></img></td>
            </tr>

            </table>
            </div>
        </div>

    )
}

export default account;