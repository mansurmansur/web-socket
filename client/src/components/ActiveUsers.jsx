import React from "react"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveUsers } from "../redux/users";
import { updateIsUserSelected } from "../redux/user";
import Card from "./Card";

const ActiveUsers = (props) => {
    const socket = useSelector(state=> state.socket.socket)
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username)
    const activeusers = useSelector(state => state.users.activeusers)

    useEffect(() => {
      // event listener for active users
      socket.on("activeUsers", (users) => {
        dispatch(
          updateActiveUsers(users.filter((user) => user.username !== username))
        );
      });
    }, [activeusers]);

    // function handle click
    function handleClick(user){
        dispatch(updateIsUserSelected({isUserSelected: true, user}))
    }

  return (
    <div>
    {typeof activeusers !== "undefined" && activeusers.length > 0 ? (
      <div>
        {activeusers.map((user, index) => (
          <Card
            key={index}
            user={user}
            onClick={() => handleClick(user)}
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
