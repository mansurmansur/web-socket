import React from "react"
import "../styles/sideNav/activeUsers.css"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveUsers } from "../redux/users";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import Card from "./Card";

const ActiveUsers = (props) => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username)
    const activeusers = useSelector(state => state.users.activeUsers)

    useEffect(() => {
      const usersRef = collection(db, 'users');
      const unsubscribe = onSnapshot(usersRef, (snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          const userData = doc.data();

          //filter out the current user from the active users
          if(userData.username !== username){
            users.push(userData)
          }
        })
        dispatch(updateActiveUsers(users));
      });


      return () => {
        unsubscribe();
      }
    }, [username, dispatch]);



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
