import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return(
      <div>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup" >Signup</NavLink>
        <NavLink to="/edit-profile" >Edit Profile</NavLink>
        <NavLink to="/reservations" >Reservations</NavLink>
        <NavLink to="/admin" >Administrator</NavLink>
        <NavLink to="/new-tour" >Create a Tour</NavLink>
      </div>
    )

}

export default NavBar;
