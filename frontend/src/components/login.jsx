import React, { Component, useState, useContext } from 'react';
import AuthContext from '../context/authContext';
import '../assets/login.css';
import axios from 'axios';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import GoogleLogin from 'react-google-login';

const Login = () =>{
    
    const navigate = useNavigate();
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(true);
    const { getLoggedIn } = useContext(AuthContext);

    // Google login handler
    const responseGoogle = async (res) => {
        console.log(res);
        await axios.post('http://localhost:5000/googlelogin', {tokenId: res.tokenId})
            .then(res => console.log("Google login success", res))
            .catch(err => console.log(err));
            console.log("logging in");
            await getLoggedIn();
            navigate("/");
      }

    const responseErrorGoogle = (res) => {
        console.log(res);
    }
    
    const HandleSubmit = async (event) =>{
        event.preventDefault();
        const data = {
            //username: username,
            email: name,
            password: password
        };
        if (loggingIn) {
            // axios
            await axios.post('http://localhost:5000/login', data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
            console.log("logging in");
            await getLoggedIn();
            navigate("/");
        } 
    }

    return(
        <div className = "center">
            <h1>Login</h1>
            <form method = "post" onSubmit={HandleSubmit}>
                <div className="uniqueLogin" value = "test">
                <input type = "button" value ="Login with Gmail"></input>
                
                <GoogleLogin
                    clientId="155459917287-hgt37hna82ei0h2hasqdljs003biladv.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <span></span>
                <input type = "button" value ="Login with Twitter">
                    
                </input>

                <div className = "sep"></div>

                </div>
                <div className = "txt_field">
                    <input type = "text" value={name} onChange={e => setUsername(e.target.value)} required>

                    </input>
                    <label> email</label>

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