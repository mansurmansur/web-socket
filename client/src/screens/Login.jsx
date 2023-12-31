import React from "react"
import { useEffect } from "react";
import '../styles/forms/forms.css'
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { setUsername, setId } from "../redux/user";
import socket from "../services/socket";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { app, db } from "../services/firebase";
import { collection, doc, getDoc} from "firebase/firestore";



const Login = (props) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate()  

  useEffect(()=>{
    console.log("Login 1st creation")

    return()=>{
      console.log("Login destroyed")
    }
  })
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
    //data validation
    if (validateEmail(e.target[0].value) && validatePassword(e.target[1].value)) {
      signInWithEmailAndPassword(auth,e.target[0].value , e.target[1].value)
        .then(async (response) => {
          const usersRef = collection(db, "users")
          const userDoc =  doc(usersRef, response.user.uid)
          const docSnap = await getDoc(userDoc);
          if(docSnap.exists()){
            const userInfo = docSnap.data()
            dispatch(setUsername(userInfo.username))
            dispatch(setId(response.user.uid))
            socket.auth = {userInfo};
            socket.connect();
            navigate("/")
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

          <p className="text-button">Don't have an account? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
