// src/Register.js
import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';



const Register = () => {
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()

    const [disablesubmit,setdisablesubmit]=useState(false)

    const [error,seterror]=useState('')

    const handleRegister = async () => {
       if(!name||!email||!password)
       {
        seterror("fill all fields")
        return;
       }
       seterror('')
       setdisablesubmit(true)

       createUserWithEmailAndPassword(auth,email,password)
       .then(async(result)=>
       {
        setdisablesubmit(false)
        const user=result.user
        await updateProfile(user,{displayName:name})//change the result of firebase
        navigate("/home")
        console.log(result)
       }
       )
       .catch((error)=>
       {
        setdisablesubmit(false)
        seterror("something went wrong")
       })
       
       


       
    };

    return (
        <div className='container'>
            <h2>Register</h2>
           <input 
            type="text" 
            value={name}
            placeholder='name'
             onChange={(e) => setName(e.target.value)} required />
           
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
            <h2>{error}</h2>
            <button onClick={handleRegister} disabled={disablesubmit}>Register</button>
            <p>already have a account?<Link to="/">login</Link></p>
        </div>
    );
};

export default Register;
