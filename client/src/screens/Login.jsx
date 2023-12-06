import React from "react"
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { setUsername } from "../redux/user";
import { useNavigate } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { app } from "../services/firebase";

const Login = (props) => {
  const auth = getAuth(app);
    // const navigate = useNavigate();
    const dispatch = useDispatch()




    // navigate to signup page for new users
    function handleCreateNewAccount(e){
      // navigate({
      //   pathname: "/register"
      // });
    }

    function handleSubmit(e) {
      e.preventDefault()
        // //data validation
        // if(userInputUsername !== '' & password !== ''){
        //   signInWithEmailAndPassword(auth, userInputUsername, password)
        //   .then((response) => {
        //     //set username
        //     dispatch(setUsername(userInputUsername))
        //     //navigate to chat
        //     // navigate({
        //     //   pathname: "/chat",
        //     // });
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
        //}
    }
  return (
    <div className="container">
      <div className="form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="page-header">Pocket Chat</p>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="mmansur@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
            />
          </div>

          <input type="button" value="Login" onClick={handleSubmit} />

          <p className="text-button">Don't have an account? Register</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
