import React from "react"
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { setUsername } from "../redux/user";
import { useNavigate } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { app } from "../services/firebase";

const Login = (props) => {
  const auth = getAuth(app);
    const navigate = useNavigate();
    const [userInputUsername, setUserInputUsername] = useState('');
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    //update username input on change
    function updateUsernameInput(e) {
        setUserInputUsername(e.target.value);
    }

    //update username input on change
    function updatePasswordInput(e) {
        setPassword(e.target.value);
    }

    // navigate to signup page for new users
    function handleCreateNewAccount(e){
      navigate({
        pathname: "/register"
      });
    }

    function handleSubmit(e) {
      e.preventDefault()
        //data validation
        if(userInputUsername !== '' & password !== ''){
          signInWithEmailAndPassword(auth, userInputUsername, password)
          .then((response) => {
            //set username
            dispatch(setUsername(userInputUsername))
            //navigate to chat
            navigate({
              pathname: "/chat",
            });
          })
          .catch((error) => {
            console.log(error)
          })
        }
    }
  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username"  value={userInputUsername} placeholder="mmansur@gmail.com" onChange={updateUsernameInput}/>
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"  value={password}  onChange={updatePasswordInput}/>
        <br />
        <input type="button" value="Login" onClick={handleSubmit} />
        <br />
        <input type="button" value="Create new account" onClick={handleCreateNewAccount}/>
      </form>
    </div>
  )
};

export default Login;
