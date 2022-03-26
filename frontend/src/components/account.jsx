import '../assets/account.css';
import React, { useCallback, useState } from "react";
import Dropzone from './dropzone.jsx';
import ImageList from './ImageList.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import cuid from "cuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import update from "immutability-helper";



function Account() {

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

    const moveImage = (dragIndex, hoverIndex) => {
        // Get the dragged element
        const draggedImage = images[dragIndex];
        /*
          - copy the dragged image before hovered element (i.e., [hoverIndex, 0, draggedImage])
          - remove the previous reference of dragged element (i.e., [dragIndex, 1])
          - here we are using this update helper method from immutability-helper package
        */
        setImages(
          update(images, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
          })
        );
    };


    return (
        
        <><DndProvider backend={HTML5Backend}>
            <ImageList images={images} moveImage={moveImage}  />
        </DndProvider>

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
                </div>

                <div id="resize">

                    <ImageList images={images} />

                </div>

                {/* <div id="tableinfo">
        <table>
         
            <tr>
                <td><img src="/logo192.png"></img></td>
                <td><img src="/logo192.png"></img></td>
                <td><img src="/logo192.png"></img></td>
            </tr>
            <tr>
                <td><img src="/logo192.png"></img></td>
                <td><img src="/logo192.png"></img></td>
                <td><img src="/logo192.png"></img></td>
            </tr>
            <tr>
                <td><img src="/logo192.png"></img></td>
                <td><img src="/logo192.png"></img></td>
                <td><img src="/logo192.png"></img></td>
            </tr>

        </table>
    </div>*/}
            </div></>

    );
}

export default Account;