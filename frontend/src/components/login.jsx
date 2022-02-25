import React, { Component } from 'react';
import '../assets/login.css';
import { Link } from "react-router-dom";



const login = () =>{
    return(
        <div class = "center">
            <h1>Login</h1>
            <form method = "post">
                <div class="uniqueLogin">
                <input type = "button" value ="Login with Gmail">

                </input>
                <span></span>
                <input type = "button" value ="Login with Twitter">
                    
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
                    <input type = "submit" value ="Login">

                    </input>
                    <span></span>
                    
                    <input type = "submit" value = "register">
                        <a href = "registration.jsx">Registraion</a>
                    </input>
                    
                    
                </div>
                
            </form>
        </div>
    );
}
 

export default login;