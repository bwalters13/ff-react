import React from 'react';
import {  Link } from "react-router-dom";
import "./Navbar.css"
import living from './liv.jpg'

function Navbar() {
  return (
    <div class="navbar">  
      {/* <img src={living} alt="" /> */}
      <li>
        <Link to="/">Scoreboard</Link>
      </li>
      <li>
        <Link to="/scores">Matchups</Link>
      </li>
    </div>
  )
}
export default Navbar;