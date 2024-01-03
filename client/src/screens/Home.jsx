import React, { useEffect } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector";
import ChatSection from "../components/ChatSection"
import SideNav from "../components/SideNavBar"
import socket from "../services/socket";

const Home = (props) => {
  const user = useSelector(state => state.user)

  useEffect(()=>{
    //check if socket if connected
    if( !socket.connected){
      const userInfo = user;
      socket.auth = {userInfo}
      socket.connect()
    }
  },[])
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
