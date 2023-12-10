import React from "react"
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { setUsername } from "../redux/user";
import { useNavigate } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { app, db } from "../services/firebase";
import { collection, doc, getDoc} from "firebase/firestore";

const Login = (props) => {
  const auth = getAuth(app);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // navigate to signup page for new users
  function handleCreateNewAccount(e) {
    // navigate({
    //   pathname: "/register"
    // });
  }

  // function that validates emails
  function validateEmail(email) {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailReg.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  // function that validates password
  function validatePassword(password){
    if(password !== '' && password.length >= 6){
      return true;
    }else{
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    //data validation
    if (validateEmail(e.target[0].value) && validatePassword(e.target[1].value)) {
      signInWithEmailAndPassword(auth,e.target[0].value , e.target[1].value)
        .then(async (response) => {
          console.log(response.user.uid)
          const usersRef = collection(db, "users")
          const userDoc =  doc(usersRef, response.user.uid)
          const docSnap = await getDoc(userDoc);
          console.log(docSnap)

          if(docSnap.exists()){
            const userInfo = docSnap.data()
            console.log(userInfo)
          } else {
            console.log("No Such document !")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <div className="container">
      <div className="form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="page-header">Pocket Chat</p>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="mmansur@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>

          <button className="login-button">Login</button>

          <p className="text-button">Don't have an account? Register</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
