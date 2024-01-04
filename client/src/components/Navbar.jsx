import React from "react"
import { useSelector } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const Navbar = (props) => {
  const username = useSelector((state)=> state.user.username);
  return (
    <div className="navBar">
      <span className="logo">Pocket</span>
      <div className="profile-wrapper">
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
        <span className="user-name">{username}</span>
      </div>
    </div>
  );
};

export default Navbar;
