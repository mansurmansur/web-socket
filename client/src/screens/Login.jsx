import React from "react"
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { setUsername } from "../redux/user";
import { createSearchParams, useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const dispatch = useDispatch()

    function onChange(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        navigate({
          pathname: "/chat",
          search: createSearchParams({id: input}).toString()
        });

        //set username
        dispatch(setUsername(input))
    }
  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username"  value={input} placeholder="mmansur" onChange={onChange}/>
        <br />
        <input type="button" value="Submit"  />
      </form>
    </div>
  )
};

export default Login;
