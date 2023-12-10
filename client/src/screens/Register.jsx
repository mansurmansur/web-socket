import React from "react"
import { Link } from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { app } from "../services/firebase";


const Register = (props) => {
  const auth = getAuth(app);

  
const handleSubmit = e => {
  e.preventDefault();
  if(validateEmail(e.target[0].value) && 
  validateName(e.target[1].value) && 
  validateName(e.target[2].value) && 
  validatePassword(e.target[3].value) && 
  validateConfirmPassword(e.target[4].value, e.target[3].value)){
    createUserWithEmailAndPassword(auth, e.target[0].value, e.target[3].value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
    })
    .catch((error)=>{
      const errorCode = error.code;
      console.log(errorCode)
    })
    console.log("passed")
  } else {
    console.log("not passed")
  }
}

// function that validates emails
function validateEmail(email){
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(emailReg.test(email)){
    return true;
  } else{
    return false;
  }
}

// function that validate firstname / lastname
function validateName(name){
  const regName = /^[a-zA-Z]+$/;

  if(!regName.test(name)){
    return false;
  } else {
    return true;
  }
}

// function that validated password
function validatePassword (password){
  const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if(!passwordReg.test(password)){
    return false;
  } else {
    return true;
  }

}

// function to validate confirmPassword
function validateConfirmPassword(confirmPassword, password){
  if(confirmPassword === ""){
    return false;
  } else if (confirmPassword !== password ){
    return false;
  } else{
     return true;
  }
}
  
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

          <button className="register-button">Create new account</button>
          <p className="text-button">Already have an account? Login</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
