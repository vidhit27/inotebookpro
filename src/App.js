// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { About } from './components/About';
import { Home } from './components/Home';
import Alert from './components/Alert'
import NoteState from './Context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';



function App() {
  const [alert,setalert]=useState(null);
  const showalert=(msg,type)=>{
    setalert({
      msg:msg,
      type:type
    })
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
    <Routes>
      <Route exact path="/" element={<Home showalert={showalert}/>}/>
      <Route exact path="/About1" element={<About/>}/> 
      <Route exact path="/login" element={<Login showalert={showalert}/>}/> 
      <Route exact path="/signup" element={<Signup showalert={showalert}/>}/>      
    </Routes>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
