import React from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const Navbar = (props) => {
  return (
    <div className="navBar">
      <span className="logo">Pocket</span>
      <div className="profile-wrapper">
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
        <span className="user-name">John</span>
      </div>
    </div>
  );
};

export default Navbar;
