import '../assets/account.css';
import React, { useCallback, useState, useContext } from "react";
import Dropzone from './dropzone.jsx';
import ImageList from './ImageList.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
import cuid from "cuid";
import AuthContext from '../context/authContext';



function Account() {
    const { loggedIn } = useContext(AuthContext);
    const { userInfo } = useContext(AuthContext);
    console.log(loggedIn);
    console.log(userInfo.id);
    console.log(userInfo.email);
    const [images, setImages] = useState([]);

      const onDrop = useCallback(acceptedFiles => {
        // Loop through accepted files
        acceptedFiles.map(file => {
          // Initialize FileReader browser API
          const reader = new FileReader();
          // onload callback gets called after the reader reads the file data
          reader.onload = function(e) {
            // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
            setImages(prevState => [
              ...prevState,
              { id: cuid(), src: e.target.result }
            ]);
          };
          // Read the file as Data URL (since we accept only images)
          reader.readAsDataURL(file);
          return file;
        });
    }, []) ;


    return (
        <><main className="Account">
           
           
        </main>
        
        <div className="accounth">

                <div className='accountInfo'>
                    <div id="profilePic">
                        <img id="profileImg" src="/logo192.png"></img>
                    </div>

                    <div className='usernameAndSocials'>
                        <div id="profileCont">
                            <p>
                                Username
                            </p>
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
                    
                    <div id="profileDrag">
                    <Dropzone onDrop={onDrop} accept={"image/*"} />
                     
                    </div>
                    <div id="editButton">
                    <input type = "button" value ="Edit Profile">
                    
                    </input>
                    </div>
                    
                    
                </div>

                <div id="tableinfo">
                <Link to={"/gallery"} className="galleryButton"> Gallery </Link>
                    <table>
                    <ImageList images={images} />
                    
                        

                    </table>
                </div>
            </div></>

    );
}

export default Account;