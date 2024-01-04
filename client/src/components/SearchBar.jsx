import React from "react"
import "../styles/sideNav/searchBar.css"

const SearchBar = (props) => {
  return (
    <div className="searchBar">
      <form action="" className="search-form">
        <input type="text" name="search" id="search" placeholder="Search" />
      </form>
    </div>
  )
};

export default SearchBar;
