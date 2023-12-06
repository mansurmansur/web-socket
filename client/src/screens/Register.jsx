import React from "react"
import { Link } from "react-router-dom";

const handleSubmit = e => {
  e.preventDefault();
}

const Register = (props) => {
  return (
    <div className="container">
      <div className="form-wrapper">
        <form className="register-form" onSubmit={handleSubmit}>
          <p className="page-header">Pocket Chat Registration Page</p>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="mmansur@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="doe"
            />
          </div>
          <div>
            <label htmlFor="newpassword">New Password</label>
            <input type="password" name="newpassword" id="newpassword" />
          </div>
          <div>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
            />
          </div>

          <input type="button" value="Create new account" />
          <p className="text-button">Already have an account? Login</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
