import React from "react"
import '../styles/forms/forms.css'
import {Link } from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "../services/firebase";


const Register = (props) => {
  const auth = getAuth(app);

  
const handleSubmit = async (e) => {
  e.preventDefault();
  if(validateEmail(e.target[0].value) && 
  validateName(e.target[1].value) && 
  validateName(e.target[2].value) && 
  validatePassword(e.target[3].value) && 
  validateConfirmPassword(e.target[4].value, e.target[3].value)){
    try {
      const response = await createUserWithEmailAndPassword(auth, e.target[0].value, e.target[3].value);

      if(response.user.uid){
        await setDoc(doc(db, "users", response.user.uid),{
          firstname: e.target[1].value,
          lastname: e.target[2].value,
          username: `${e.target[1].value}${e.target[2].value.charAt(0)}`,
          id: response.user.uid,
          photoUrl: ''
        })
      }
    } catch (error) {
      console.log(error.code)
    }
  } else {
    console.log("Form validation failed")
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
          <p className="text-button">Already have an account? <Link to={'/login'}>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
