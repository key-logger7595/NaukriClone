// Name must be greater than or equal to 5 
// Email must containe @
// Password length should be greater than 6 
import React,{useContext, useState} from 'react'
import classes from './SignUp.module.css';
import {NavLink} from 'react-router-dom';
import Layout from '../UI/Layout';
import { AuthContext } from '../../store/auth-Context';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
    const [name,setName] = useState('');
    const [nameIsValid,setNameIsValid] = useState(null);
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(null);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);
    const[enteredConfirmPassword,setEnteredConfirmPassword] = useState('');
    const[confirmedPasswordIsValid,setConfirmPasswordIsValid] = useState(null);
    const[errorMessage,setErrorMessage] = useState(null);

    const history = useHistory();
    const authCtx = useContext(AuthContext);
  
    const nameChangeHandler = (event)=> {
         setErrorMessage(null);
         setNameIsValid(null);
         setName(event.target.value);
        
         setFormIsValid(
           event.target.value.trim().length >= 5 && enteredEmail.includes('@') && enteredPassword.trim().length > 6 && (enteredConfirmPassword.trim().length === enteredPassword.trim().length)
        );
  
    }
   
    const emailChangeHandler = (event) => {
      setErrorMessage(null);
      setEmailIsValid(null);
      setEnteredEmail(event.target.value);
       
      setFormIsValid(
        name.trim().length >= 5 &&  event.target.value.includes('@') && enteredPassword.trim().length > 6 && (enteredConfirmPassword.trim().length === enteredPassword.trim().length)
      );
    };
  
    const passwordChangeHandler = (event) => {
      setErrorMessage(null);
      setPasswordIsValid(null);
      setEnteredPassword(event.target.value);
  
      setFormIsValid(
        name.trim().length >= 5 && event.target.value.trim().length > 6 && enteredEmail.includes('@') && (event.target.value.trim().length === enteredConfirmPassword.trim().length)
      );
    };
    const confirmPasswordHandler = (event)=> {
      setErrorMessage(null);
      setConfirmPasswordIsValid(null);
      setEnteredConfirmPassword(event.target.value);
      setFormIsValid(
        name.trim().length >= 5 &&  enteredPassword.trim().length > 6 && enteredEmail.includes('@') && (event.target.value.trim().length === enteredPassword.trim().length)
      );
  
    }
    const validateEmailHandler = () => {
      setEmailIsValid(enteredEmail.includes('@'));
    };
  
    const validatePasswordHandler = () => {
      setPasswordIsValid(enteredPassword.trim().length > 6);
    };
     
    const validateConfirmPasswordHandler = ()=>{
      setConfirmPasswordIsValid(enteredConfirmPassword.trim().length === enteredPassword.trim().length);
    }
    const validateNameHandler = ()=> {
      setNameIsValid(name.trim().length >= 5)
  }
  
    const submitHandler = (event) => {
      let skills = "Html, CSS, Javascript";

      event.preventDefault();
      fetch(' https://jobs-api.squareboat.info/api/v1/auth/register',{
        method:'POST',
        body:JSON.stringify({
          email:enteredEmail,
          userRole:0,
          password:enteredPassword,
          confirmPassword:enteredConfirmPassword,
          name:name,
          skills: skills
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
        setEnteredEmail("");
        setEnteredPassword("");
        setEmailIsValid(null);
        setPasswordIsValid(null);
        setName('');
        setNameIsValid(null);
        setEnteredConfirmPassword("");
        setConfirmPasswordIsValid(null);
        setFormIsValid(false);
        authCtx.login(data.data.token,data.data.email);
        history.replace("/home");
      }).catch(err=>{
        setEnteredEmail("");
        setEnteredPassword("");
        setEmailIsValid(null);
        setPasswordIsValid(null);
        setName('');
        setNameIsValid(null);
        setEnteredConfirmPassword("");
        setConfirmPasswordIsValid(null);
        setFormIsValid(false);
        console.log(err);
        console.log(err.message);
        setErrorMessage(err.message);
      })
     
    };
  
    let emailSpan ='';
    let passwordSpan = '';
    let confirmPasswordSpan='';
    let nameSpan = '';

    let invalid1 = `${
        nameIsValid === false ? classes.invalid : ''
      }`;
    let invalid2 = `${
        emailIsValid === false ? classes.invalid : ''
      }`;
    let invalid3 = `${
        passwordIsValid === false ? classes.invalid : ''
      }`
    let invalid4 = `${
        confirmedPasswordIsValid === false ? classes.invalid : ''
      }`;
    
    if(nameIsValid === false){
      if(name === ''){
         nameSpan = `This field is Mandatory`;
      }else{
         nameSpan = `Name must be longer than 5 characters`; 
      }
    }
  
    if(emailIsValid===false){
      if(enteredEmail===''){
        
        emailSpan = `this field is mandatory`;
      }else{
        
        emailSpan=`Incorrect Email`;
      }
     
    }
  
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
   
    return (
         <Layout>
            <div className={classes.signUp}>
                <form onSubmit={submitHandler}>
                    <span className={classes.signUpspan}>SignUp</span><br/>
                    <span className={classes.iam}>Iama*</span><br/>
                    <div className={classes.Recruiter}>
                        {/* <span className={classes.icon1}><i class="far fa-file-search icon"></i></span> */}
                        <span className={classes.Text}>Recruiter</span>
                    </div>
                    <div className={classes.Candidate}>
                        <span className={classes.Text}>Candidate</span>
                    </div>
                    {/* <span className={classes.Recruiter}>Recruiter</span>
                    <span className={classes.Candidate}>Candidate</span> */}
                    <div
                        className={[classes.control, invalid1].join(' ')} 
                    >
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={nameChangeHandler}
                            onBlur={validateNameHandler}
                            placeholder="Enter Your Name"
                        />
                    </div>
                    <div
                        className={[classes.control, classes.control1, invalid2].join(' ')} 
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
                        className={[classes.control, classes.control2, invalid3].join(' ')} 
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
                    <div
                        className={[classes.control, classes.control3,invalid4].join(' ')} 
                    >
                        <label htmlFor=" Confirm password"> ConfirmPassword</label>
                        <input
                            type="password"
                            id=" Confirm password"
                            value={enteredConfirmPassword}
                            onChange={confirmPasswordHandler}
                            onBlur={validateConfirmPasswordHandler}
                            placeholder="Enter Your Password"
                        />
                    </div>
                    <div className={classes.actions}>
                        <button type="submit" disabled={!formIsValid}>
                            Signup
                        </button>
                    </div>
                </form>
            </div>
             <span className={classes.login1}>
                    <span className={classes.span1}>Have An Account?</span>
                    <span className={classes.span2}><NavLink to="/login">Login</NavLink></span>
            </span>
            <span className={[classes.error, classes.error1].join(' ')}>{nameSpan}</span>
            <span className={[classes.error, classes.error2].join(' ')}>{emailSpan}</span>
            <span className={[classes.error, classes.error3].join(' ')}>{passwordSpan}</span>
            <span className={[classes.error, classes.error4].join(' ')}>{confirmPasswordSpan}</span>
            <span className={classes.backendError}>{errorMessage}</span>
         </Layout>
    )
}

export default SignUp;
