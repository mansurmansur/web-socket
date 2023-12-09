import React from "react"
import ChatSection from "../components/ChatSection"
import SideNav from "../components/SideNav"

const Home = (props) => {
  return (
    <div className="container">
      <div className="home-wrapper">
        <SideNav />
        <ChatSection />
      </div>
    </div>
  )
};

export default Home;
