import React, { Component } from 'react';
import '../assets/login.css';



const login = () =>{
    return(
        <div class = "center">
            <h1>Login</h1>
            <form method = "post">
                <div class="uniqueLogin">
                <input type = "button" value ="Login with Gmail">

                </input>
                <span></span>
                <input type = "button" value ="Login withTwitter">
                    
                </input>

                <div class = "sep"></div>

                </div>
                <div class = "txt_field">
                    <input type = "text" required>

                    </input>
                    <label> username</label>

                </div>
                <div class = "txt_field">
                    <input type = "text" required>

                    </input>
                    <span></span>
                    <label> password</label>
                    
                </div>
                <div class = "regSub">
                    <input type = "submit" value ="login">

                    </input>
                    <span></span>
                    <input type = "submit" value ="register">
                        
                    </input>
                </div>
                
            </form>
        </div>
    );
}
 

export default login;