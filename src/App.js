import './App.css';
import React from "react";
import Login from './Components/Login';
import NewLogin from './Components/Newlogin';
import Myaccount from './Components/Myaccount';
import Calendar from './Components/Calendar';
import Event from './Components/event';
import Nonevent from './Components/nonevent';
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App () {

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/:id' element={<Login />} />
        <Route path='/Myaccount' element={<Myaccount/>} />
        <Route path='/Calendar' element={<Calendar/>} />
        <Route path='/event' element={<Event/>} />
        <Route path='/Nonevent' element={<Nonevent/>} />
   

      </Routes>
    </>
  );
}

export default App;
