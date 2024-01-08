import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import ChatSection from "../components/ChatSection"
import SideNav from "../components/SideNavBar"
import socket from "../services/socket";
import { useMessageListener } from "../customHooks/useMessageListener";
import { updateActiveUsers } from "../redux/users";

const Home = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

    // listen for incoming messages
    useMessageListener();

  useEffect(()=>{
    //check if socket if connected
    if( !socket.connected){
      const userInfo = user;
      socket.auth = {userInfo}
      socket.connect()
    }
  },[user])

  useEffect(()=>{
    socket.on("users", handleUsers);

    return () => {
      socket.off("users",handleUsers);
    }
  }, [])

  // function: handleUsers
  const handleUsers = (data) => {
    dispatch(updateActiveUsers(data))
  }

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
