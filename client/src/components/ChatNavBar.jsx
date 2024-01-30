import React from "react"
import { useSelector } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const ChatNavBar = (props) => {
  const findUser=(userId) => {
    return users.find(user => user.id === userId)
  }
  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    // Get the day, month, year, hours, minutes from the date object
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the date as you desire, for example: "January 8, 2024, 10:30 AM"
    const niceFormat = `${month} ${day}, ${year}, ${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;

    return niceFormat;
  };

  const user = useSelector((state) => state.userSelected.user) 
  const users = useSelector(state => state.users.activeUsers)
  const userInfo = findUser(user.id)

 
  return (
    <div className="navBar">
      <div className="profile-wrapper">
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
        <div className="user-name">
          {user.username}
          {userInfo && (
            userInfo.isOnline === false ? <p>{convertDate(userInfo.lastActive)}</p>: <p>Online</p>)
          }

        </div>
      </div>
    </div>
  );
};

export default ChatNavBar;
