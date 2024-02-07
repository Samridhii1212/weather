
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { useEffect, useState } from 'react';
import { auth } from './Components/firebase';

function App() {
  const [username,setusername]=useState('')

  useEffect(()=>
  {
    
    auth.onAuthStateChanged((user)=>
    {
      if(user)
      {
        console.log(user.displayName)
        setusername(user.displayName)

      }
      else setusername('')

    })

  },[])
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/home" element={username?<Home name={username}/>:<Login/>}/>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
