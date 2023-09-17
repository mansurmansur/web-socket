import React from "react"
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    function onChange(e) {
        setUsername(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        navigate({
          pathname: "/chat",
          search: createSearchParams({id: username}).toString()
        });
    }
  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username"  value={username} placeholder="mmansur" onChange={onChange}/>
        <br />
        <input type="button" value="Submit"  />
      </form>
    </div>
  )
};

export default Login;
