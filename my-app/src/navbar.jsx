import React from 'react';
import {  Link } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
  return (
    <div class="navbar">
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