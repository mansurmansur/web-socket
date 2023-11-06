import React from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const AsideSection = ({username, activeUsers, handleUserSelected}) => {
  return (
    <div className="aside-section">
    <div className="profile-info">
      <div className="profile">
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
      </div>
      <p className="username">{username}</p>
    </div>

    <div className="users">
      <h3>Users</h3>
      {!activeUsers.length ? (
        <p>No user online</p>
      ) : (
        <ul>
          {activeUsers.map((user) => (
            <li
              key={user.id}
              onClick={()=>handleUserSelected(user)}
            >
              <span className="user-icon-frame">
                {" "}
                <FontAwesomeIcon icon={faUser} className="user-icon" />
              </span>
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  )
};

export default AsideSection;
