//email must contain @ 

import React,{useState,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import Layout from '../UI/Layout';
import classes from './ForgetPassword.module.css';
import {AuthContext} from '../../store/auth-Context';

const ForgetPassword = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(null);
    const[errorMessage,setErrorMessage] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);
    const authCtx = useContext(AuthContext);
    
    
    const history = useHistory();
    
    const emailChangeHandler = (event) => {
        setErrorMessage(null);
        setEmailIsValid(null);
        setEnteredEmail(event.target.value);
         
        setFormIsValid(
          event.target.value.includes('@') 
        );
      };
    
    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    };
    let resetToken;
    const submitHandler = (event) => {
        event.preventDefault();
      
        setFormIsValid(prevState=>!prevState);
        fetch(`https://jobs-api.squareboat.info/api/v1//auth/resetpassword?email=${enteredEmail}`).then(res=>{
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data);
              let errorMessage = data.message;
              throw new Error(errorMessage);
            });
          }
        }).then(data=>{
         resetToken = data.data.token;
          setEnteredEmail("");
          
          setEmailIsValid(null);
          
          setFormIsValid("");
        //   authCtx.login(data.data.token);
        //   history.replace("/home");
        return  fetch(`https://jobs-api.squareboat.info/api/v1//auth/resetpassword/${resetToken}`)
        }).then(res=>{
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                console.log(data);
                let errorMessage = data.message;
                throw new Error(errorMessage);
              });
            }
          }).then(data=>{
            authCtx.updateResetToken(resetToken);
            setEnteredEmail("");
            
            setEmailIsValid(null);
            
            setFormIsValid("");
          

         
           history.replace("/reset");
          }).catch(err=>{
          setEnteredEmail("");
         
          setEmailIsValid(null);
    
          setFormIsValid("");
          
          setErrorMessage(err.message);
        })
       
      };
    
    let emailSpan ='';
    if(emailIsValid===false){
        if(enteredEmail===''){
          
          emailSpan = `This field is mandatory*`;
        }else{
          
          emailSpan=`Incorrect Email`;
        }
    }

    let invalid1 =  `${
        emailIsValid === false ? classes.invalid : ''
    }`;
    return (
        <Layout>
            <div className={classes.forgetPassword}>
                <form onSubmit={submitHandler}>
                    <h1 className={classes.forgetPasswordPara}>Forget Your Password?</h1>

                    <p className={classes.iam}> Enter the email associated with your account and we’ll send you instructions to reset your password.</p>
                    <div className={[classes.control, invalid1].join(' ')} >
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={enteredEmail}
                            onChange={emailChangeHandler}
                            onBlur={validateEmailHandler}
                            placeholder="Enter Your Email"
                        />
                    </div>
                
                    <div className={classes.actions}>
                        <button type="submit" disabled={!formIsValid}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
                <span className={classes.loginButton}>
                </span>
                <span className={classes.loginText}>
                   <NavLink to="/login">Login/</NavLink>
                   <NavLink to="/Signup">Signup</NavLink>
                </span>
                <span className={[classes.error, classes.error1].join(' ')}>{emailSpan}</span>
                <span className={classes.backendError}>{errorMessage}</span>
                    
        </Layout>
       
    )
}

export default ForgetPassword;
