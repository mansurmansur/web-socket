import React from "react"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveUsers } from "../redux/users";
import { updateIsUserSelected } from "../redux/user";
import Card from "./Card";

const ActiveUsers = (props) => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username)
    const activeusers = useSelector(state => state.users.ActiveUsers)

    useEffect(() => {


    }, []);

    // function handle click
    function handleClick(user){
        dispatch(updateIsUserSelected({isUserSelected: true, user}))
    }

  return (
    <div>
    {typeof activeusers && activeusers.length > 0 ? (
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
