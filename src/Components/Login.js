import React from 'react'
import { useState } from 'react';
import {signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';

function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const [disablesubmit, setdisablesubmit] = useState(false)

    const [error, seterror] = useState('')

    const handleRegister = async () => {
        if (!email || !password) {
            seterror("fill all fields")
            return;
        }
        seterror('')
        setdisablesubmit(true)

        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                setdisablesubmit(false)
                navigate("/home")
                
            }
            )
            .catch((error) => {
                setdisablesubmit(false)
                seterror("something went wrong")
            })
};

    return (
      <div className='container'>
            <h2>Login</h2> 
            
            <input
             type="email" 
             value={email} 
             placeholder='email'
             onChange={(e) => setEmail(e.target.value)} required />
           
            <input 
            type="password" 
            value={password} 
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)} required />
            <h3>{error}</h3>
            <button onClick={handleRegister} disabled={disablesubmit}>Login</button>
            <p>dont have a account?<Link to="/register">Register</Link></p>
        </div>
       
    );
       
    };
export default Login