import React,{useContext, useState} from 'react';
import { Redirect } from 'react-router-dom';
import classes from './ResetPassword.module.css';
import {NavLink} from 'react-router-dom';
import Layout from '../UI/Layout';
import { AuthContext } from '../../store/auth-Context';
import { useHistory } from 'react-router-dom';
const ResetPassword = () => {
    const authCtx = useContext(AuthContext);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);
    const[enteredConfirmPassword,setEnteredConfirmPassword] = useState('');
    const[confirmedPasswordIsValid,setConfirmPasswordIsValid] = useState(null);
    const[errorMessage,setErrorMessage] = useState(null);
    const history = useHistory();


    const passwordChangeHandler = (event) => {
        setErrorMessage(null);
        setPasswordIsValid(null);
        setEnteredPassword(event.target.value);
    
        setFormIsValid(
           event.target.value.trim().length > 6  && (event.target.value.trim().length === enteredConfirmPassword.trim().length)
        );
      };
      const confirmPasswordHandler = (event)=> {
        setErrorMessage(null);
        setConfirmPasswordIsValid(null);
        setEnteredConfirmPassword(event.target.value);
        setFormIsValid(
         enteredPassword.trim().length > 6 && (event.target.value.trim().length === enteredPassword.trim().length)
        );
    
      }

      const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
      };
       
      const validateConfirmPasswordHandler = ()=>{
        setConfirmPasswordIsValid(enteredConfirmPassword.trim().length === enteredPassword.trim().length);
      }

    let passwordSpan = '';
    let confirmPasswordSpan='';

    
    let invalid3 = `${
        passwordIsValid === false ? classes.invalid : ''
      }`
      let invalid4 = `${
        confirmedPasswordIsValid === false ? classes.invalid : ''
      }`;
    
      if(passwordIsValid===false){
        if(enteredPassword===''){
          passwordSpan=`this field is mandatory`;
        }
        else{
          passwordSpan=`Incorrect Password must be greater than 6 characters`;
        }
      }
       
    if(confirmedPasswordIsValid === false){
        confirmPasswordSpan=`Password Do not Match`;
   }
   const submitHandler = (event) => {
    let skills = "Html, CSS, Javascript";

    event.preventDefault();
    fetch(' https://jobs-api.squareboat.info/api/v1/auth/resetpassword',{
      method:'POST',
      body:JSON.stringify({
        password:enteredPassword,
        confirmPassword:enteredConfirmPassword,
        token:authCtx.resetToken
        
      }),
      headers:{
        'Content-Type': 'application/json',
      }
    }).then(res=>{
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          console.log(data);
          let errorMessage1;
          if(data && data.errors && data.errors[0].name){
             errorMessage1 = data.errors[0].name;
          }
          
          let errorMessage2 = data.message;
          console.log(errorMessage2);

          throw new Error(errorMessage1 || errorMessage2);
        });
      }
    }).then(data=>{
      
      console.log(data);  
      setEnteredPassword("");
      setPasswordIsValid(null);
      setEnteredConfirmPassword("");
      setConfirmPasswordIsValid(null);
      setFormIsValid(false);
      authCtx.clearResetToken();
      history.replace("/login");

    }).catch(err=>{
     
      setEnteredPassword("");
      setPasswordIsValid(null);
      setEnteredConfirmPassword("");
      setConfirmPasswordIsValid(null);
      setFormIsValid(false)
      console.log(err);
      console.log(err.message);
      setErrorMessage(err.message);
    })
   
  };

    if(!authCtx.isResetTokenPresent){
        return <Redirect to="/forget"/>
    }
    return (
        <Layout>
            {/* actual card div */}
            <div className={classes.resetPassword}>
                <form onSubmit={submitHandler}>
                    <h1 className={classes.resetPasswordPara}>Reset Your Password?</h1>

                    <p className={classes.iam}>Enter your new password below.</p>
                    <div className={[classes.control, invalid3].join(' ')} >
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                            onBlur={validatePasswordHandler}

                            placeholder="Enter Your Password"
                        />
                    </div>
                    <div
                        className={[classes.control, classes.control1, invalid4].join(' ')} 
                    >
                        <label htmlFor="email">Confirm New Password</label>
                        <input
                            type="password"
                            id="ConfirmPassword"
                            value={enteredConfirmPassword}
                            onChange={confirmPasswordHandler}
                            onBlur={validateConfirmPasswordHandler}
        
                            placeholder="Enter Your Password"
                        />
                    </div>

                    <div className={classes.actions}>
                        <button type="submit" disabled={!formIsValid}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
            <span className={classes.loginButton}>
                </span>
            <span className={classes.loginText}>
                 <NavLink to="/login" >Login/</NavLink>
                <NavLink to="/Signup">Signup</NavLink>
            </span>

            <span className={[classes.error, classes.error1].join(' ')}>{passwordSpan}</span>
            <span className={[classes.error, classes.error2].join(' ')}>{confirmPasswordSpan}</span>
            <span className={classes.backendError}>{errorMessage}</span>
        </Layout>
       
    )
}

export default ResetPassword;