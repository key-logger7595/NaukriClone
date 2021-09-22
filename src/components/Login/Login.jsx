// Email must contain @ in between
// Password length should be greater than 6
import  React, { useContext, useState,useEffect} from 'react';
import { useHistory,Redirect } from 'react-router-dom';
import classes from './Login.module.css'; 
import {NavLink} from 'react-router-dom';
import Layout from '../UI/Layout';
import {AuthContext} from '../../store/auth-Context';


const Login = (props) => {   
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(null);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);
    const[errorMessage,setErrorMessage] = useState(null);

    const history = useHistory();
    const authCtx = useContext(AuthContext);
  
    const emailChangeHandler = (event) => {
      setErrorMessage(null);
      setEmailIsValid(null);
      setEnteredEmail(event.target.value);
       
      setFormIsValid(
        event.target.value.includes('@') && enteredPassword.trim().length > 6 
      );
    };
     
    const passwordChangeHandler = (event) => {
      setErrorMessage(null);  
      setPasswordIsValid(null);
      setEnteredPassword(event.target.value);
  
      setFormIsValid(
       event.target.value.trim().length > 6 && enteredEmail.includes('@') 
      );
    };
  
    const validateEmailHandler = () => {
      setEmailIsValid(enteredEmail.includes('@'));
    };
  
    const validatePasswordHandler = () => {
      setPasswordIsValid(enteredPassword.trim().length > 6);
    };
   
  
    const submitHandler = (event) => {
      event.preventDefault();
    
      setFormIsValid(prevState=>!prevState);
      fetch(' https://jobs-api.squareboat.info/api/v1/auth/login',{
        method:'POST',
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword
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
            let errorMessage = data.message;
            throw new Error(errorMessage);
          });
        }
      }).then(data=>{
        setEnteredEmail("");
        setEnteredPassword("");
        setEmailIsValid(null);
        setPasswordIsValid(null);
        setFormIsValid("");
        console.log(data);
        authCtx.login(data.data.token,data.data.email);
        history.replace("/home");
      }).catch(err=>{
        setEnteredEmail("");
        setEnteredPassword("");
        setEmailIsValid(null);
        setPasswordIsValid(null);
        setFormIsValid("");
        setErrorMessage(err.message);
      })
     
    };
  
    let emailSpan ='';
    let passwordSpan = '';
    let invalid1 =  `${
        emailIsValid === false ? classes.invalid : ''
    }`;
    let invalid2 =  `${
        passwordIsValid === false ? classes.invalid : ''
    }`;
    if(emailIsValid===false){
      if(enteredEmail===''){
        
        emailSpan = `This field is mandatory*`;
      }else{
        
        emailSpan=`Incorrect Email`;
      }
    }
  
    if(passwordIsValid===false){
      if(enteredPassword===''){
        passwordSpan=`this field is mandatory*`;
      }
      else{
        passwordSpan=`Incorrect Password must be greater than 6 characters`;
      }
    }
   
    return (
        <Layout>
            <div className={classes.login}>
                <form onSubmit={submitHandler}>
                    <span>Login</span>
                    <div
                        className={[classes.control, invalid1].join(' ')} 
                    >
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
                   
                    <div
                        className={[classes.control, classes.control1, invalid2].join(' ')} 
                    >
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                            onBlur={validatePasswordHandler}
                            placeholder="Enter Your Password"
                        />
                    </div>
                    
                    <div className={classes.actions}>
                        <button type="submit" disabled={!formIsValid} >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <span className={classes.signUp}>
                    <span className={classes.span1}>New To MyJobs?</span>
                    <span className={classes.span2}><NavLink to="/Signup">Create An Account</NavLink></span>
            </span>
            <span className={classes.forgetPassword}><NavLink to="/forget">Forget Your Password ?</NavLink></span>
            <span className={[classes.error, classes.error1].join(' ')}>{emailSpan}</span>
            <span className={[classes.error, classes.error2].join(' ')}>{passwordSpan}</span>
            <span className={classes.backendError}>{errorMessage}</span>
        </Layout>
        
    )
}

export default Login;
