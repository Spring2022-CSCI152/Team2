import React, { Component, useState } from 'react';
import '../assets/registration.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

const header = () =>{

    return(

        <div className="header">
            <p>Already have an account?</p>
            <Link to = "/login">
                <button className='login' type = 'button'>Login</button>
            </Link>
        </div>

    )
}


const registration = () =>{


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
        else{
            axios.post('http://localhost:5000/app/login', data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
            console.log("logging in"); 
        }
    
    }




    return(

    
        <div className="container">
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
            <div className="col2">
                <input type = 'text' className = 'username'>

                </input>
                <input type = 'text' className = 'password'>

                </input>
                <input type = 'text' className = 'Email'>

                </input>
            </div>
        </div>

    )
    
}
 
export default header;
export default registration;