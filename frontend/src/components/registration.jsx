import React, { Component, useState } from 'react';
import '../assets/registration.css';
import axios from 'axios';
import {Link} from 'react-router-dom'



const Registration = () =>{
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, checkPassword] = useState("");
    const [email, setEmail] = useState("");
    

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = {
            name: name,
            email: email,
            password: password,
            password2: confPassword
        };
        // axios
        
            axios.post('http://localhost:5000/register', data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
            console.log("registering");
        
    }

    return(
        <div className="container1">
            <div className = "container2">
                <div className="col1">
                    <div className="">
                        <p>Already have an account?</p>
                        <Link to = "/login">
                            <button className='login' type = 'button'>Login</button>
                        </Link>
                    </div>
                    <p className = "optionSign">
                        You can also sign in with these:
                    </p>

                    <div className="placement">
                        <button className='option1' type='button'>
                            Login with Twitter
                        </button>
                        <button className='option1' type ='button'>
                            Login with Gmail

                        </button>
                    </div>
                </div>
                <form method = "post" className='form1' onSubmit={handleSubmit}>
                    <div className="col2">

                        <div className = "txt_field1">
                           
                            <input type = 'text'  className="input1" value={name} onChange={e => setUsername(e.target.value)} required>
                            
                            </input>
                            <span className='span1'></span>
                            <label className='label1'>Name</label>
                        </div>


                        <div className="txt_field1">

                          
                            <input type = 'text'  className="input1" value={email} onChange={e => setEmail(e.target.value)} required>

                            </input>
                            <span className='span1' ></span>
                            <label className='label1'> Email</label>
                        </div>

                        <div className="txt_field1">
                           
                            <input type = 'text'  className="input1" id = 'pass' value={password} onChange={e => setPassword(e.target.value)} required>

                            </input>
                            <span className='span1'></span>
                            <label className='label1'>Password</label>
                        </div>

                        <div className="txt_field1">
                           
                           <input type = 'text'  className="input1" id = 'conf' value={confPassword} onChange={e => checkPassword(e.target.value)} required>

                           </input>
                           <span className='span1'></span>
                           <label className='label1'>Confirm password</label>
                       </div>

                        
                        
                    

                    <button className='submit' type = 'submit'>
                        Submit
                    </button>

                    </div>
                </form>
            </div>
        </div>

    )
    
}
 
export default Registration;