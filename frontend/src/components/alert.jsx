import '../assets/alertUser.css';
import React from "react";

function AlertUser(){
    return (
        <>
        <div class="alertMessage">
            <p>
                Alert Message
            </p>
        </div>

        <br></br>

        <div id="artImage">

                <img id="artImg" src="/logo192.png"></img>
                <img id="artImg" src="/logo192.png"></img>
                
        </div>

        <div class="alertInfo">
            <p>
                Image Detected
            </p>
            <p>
                Your Art was detected on several websites
            </p>

            
            <input type = "submit" value ="Rescan"></input>
            <input type = "submit" value ="Resolve"></input>

            <p>
                Image Detected
            </p>
            <p>
                Your Art was detected on several websites
            </p>

            
            <input type = "submit" value ="Rescan"></input>
            <input type = "submit" value ="Resolve"></input>

            
            
        </div>
        <div id = "link1">

        
            <input type = "submit" value ="Link1"></input>
            <input type = "submit" value ="Link2"></input>
        </div>

        <div id = "link2">

        
            <input type = "submit" value ="Link1"></input>
            <input type = "submit" value ="Link2"></input>
        </div>
        
        
        
        
        </>
        

    )
}

export default AlertUser;