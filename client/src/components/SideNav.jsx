import React from "react"
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";


const SideNav = (props) => {
  return (
    <div className="sideNav">
        <Navbar />
        <SearchBar />
    </div>
  )
};

export default SideNav;