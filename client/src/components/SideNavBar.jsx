import React from "react"
import "../styles/sideNav/sideNav.css"
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import ActiveUsers from "./ActiveUsers";


const SideNav = (props) => {
  return (
    <div className="sideNav">
        <Navbar />
        <SearchBar />
        <ActiveUsers />
    </div>
  )
};

export default SideNav;