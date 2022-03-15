import React, { Component, useState } from 'react';
import '../assets/login.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Login = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(true);

    const HandleSubmit = (event) =>{
        event.preventDefault();
        const data = {
            username: username,
            email: "temporary-need-to-fill-in-login-form",
            password: password
        };
        if (loggingIn) {
            // axios
            axios.post('http://localhost:5000/app/login', data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
            console.log("logging in");
        } 
        else {
            // axios
            axios.post('http://localhost:5000/app/registration', data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
            console.log("registering");
        }
    }

    return(
        <div className = "center">
            <h1>Login</h1>
            <form method = "post" onSubmit={HandleSubmit}>
                <div className="uniqueLogin" value = "test">
                <input type = "button" value ="Login with Gmail">

                </input>
                <span></span>
                <input type = "button" value ="Login with Twitter">
                    
                </input>

                <div className = "sep"></div>

                </div>
                <div className = "txt_field">
                    <input type = "text" value={username} onChange={e => setUsername(e.target.value)} required>

                    </input>
                    <label> username</label>

                </div>
                <div className = "txt_field">
                    <input id = "password" type = "text" value={password} onChange={e => setPassword(e.target.value)} required>

                    </input>
                    <span></span>
                    <label> password</label>
                    
                </div>
                <div className = "regSub">
                    <div>
                    <input type = "submit" value ="Login" onClick={e => setLoggingIn(true)}>

                    </input>
                    </div>
                    <Link to = "/registration">
                        <button  id = "reg"  onClick={e => setLoggingIn(false)}>
                            Register
                            
                        </button>
                    </Link>
                    
                    
                </div>
                
            </form>
        </div>
    );
}
 

export default Login;