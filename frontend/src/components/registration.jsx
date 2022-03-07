import React, { Component, useState } from 'react';
import '../assets/registration.css';
import axios from 'axios';
import {Link} from 'react-router-dom'



const Registration = () =>{


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [registration, setRegisteration] = useState(true);

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = {
            username: username,
            email: email,
            password: password
        };
    
            // axios

        if(registration){

        
            axios.post('http://localhost:5000/app/signup', data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
            console.log("registering");
        
        }
        
    
    }




    return(

    
        <div className="container">
            <div className="header">
                <p>Already have an account?</p>
                    <Link to = "/login">
                        <button className='login' type = 'button'>Login</button>
                    </Link>
                </div>
            <div className="col1">
                <p>
                    You can also sign in with these:
                </p>
                <button className='Twitter' type='button'>
                    Login with Twitter
                </button>
                <button className='Gmail' type ='button'>
                    Login with Gmail

                </button>
            </div>
            <form method = "post" onSubmit={handleSubmit}>
                <div className="col2">
                    <input type = 'text' className = 'username' value={username} onChange={e => setUsername(e.target.value)} required>

                    </input>
                    <input type = 'text' className = 'password' value={setPassword} onChange={e => setPassword(e.target.value)} required>

                    </input>
                    <input type = 'text' className = 'Email' value={setEmail} onChange={e => setEmail(e.target.value)} required>

                    </input>
                </div>

                <button className='submit' type = 'button' onClick={e => setRegisteration(true)}>
                    Submit
                </button>
            </form>
        </div>

    )
    
}
 
export default Registration;