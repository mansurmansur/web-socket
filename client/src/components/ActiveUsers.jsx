import React from "react"
import "../styles/sideNav/activeUsers.css"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateIsOnline } from "../redux/users";
import Card from "./Card";
import socket from "../services/socket";

const ActiveUsers = (props) => {
    const dispatch = useDispatch();
    const activeusers = useSelector(state => state.users.activeUsers)

    useEffect(()=>{
      //listen for users presence status
      socket.on("active users", (users) => {
        dispatch(updateIsOnline(users))
      })

      return () => {
        socket.off("active users");
      }
    }, [])


  return (
    <div className="friendList">
    {typeof activeusers && activeusers.length > 0 ? (
      <div>
        {activeusers.map((user, index) => (
          <Card
            key={index}
            user={user}

          />
        ))}
      </div>
    ) : (
      <div>No active users</div>
    )}
  </div>
  )
};

export default ActiveUsers;
