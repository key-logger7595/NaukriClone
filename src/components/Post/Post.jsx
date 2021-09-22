// Job title must be greater than greater than 5 characters
// description must be greater than 15 characters
//Location must be greater than 5 characters

import  React, { useContext, useState,useEffect} from 'react';
import { useHistory,Redirect } from 'react-router-dom';
import classes from './Post.module.css'; 
import {Link} from 'react-router-dom';
import Layout from '../UI/Layout';
import {AuthContext} from '../../store/auth-Context';
import HomeIcon from '@material-ui/icons/Home';


const Post = (props) => {   
    const [enteredTitle, setEnteredTitle] = useState('');
    const [titleIsValid, setTitleIsValid] = useState(null);
    const [enteredDescription, setEnteredDescription] = useState('');
    const [descriptionIsValid, setDescriptionIsValid] = useState(null);
    const[enteredLocation,setEnteredLocation] = useState('');
    const[locationIsValid,setLocationIsValid] = useState(null);

    const [formIsValid, setFormIsValid] = useState(false);
    const[errorMessage,setErrorMessage] = useState(null);

    const history = useHistory();
    const authCtx = useContext(AuthContext);
  
    const titleChangeHandler = (event) => {
      setErrorMessage(null);
      setTitleIsValid(null);
      setEnteredTitle(event.target.value);
       
      setFormIsValid(
        event.target.value.trim().length > 5  && enteredDescription.trim().length > 15  && enteredLocation.trim().length >= 3 
      );
    };
     
    const descriptionChangeHandler = (event) => {
      setErrorMessage(null);  
      setDescriptionIsValid(null);
      setEnteredDescription(event.target.value);
  
      setFormIsValid(
        enteredTitle.trim().length > 5  && event.target.value.trim().length > 15  && enteredLocation.trim().length >= 3 

      );
    };

    const locationChangeHandler = (event)=>{
        setErrorMessage(null);
        setLocationIsValid(null);
        setEnteredLocation(event.target.value);
        
        setFormIsValid(
            enteredTitle.trim().length > 5  && enteredDescription.trim().length > 15  && event.target.value.trim().length >= 3 
        );

    }
  
    const validateTitleHandler = () => {
      setTitleIsValid(enteredTitle.trim().length > 5);
    };
  
    const validateDescriptionHandler = () => {
      setDescriptionIsValid(enteredDescription.trim().length > 15);
    };
    
    const validateLocationHandler = () => {
        setLocationIsValid(enteredLocation.trim().length >=  3);
    };

    const logoutHandler = ()=>{
        authCtx.logout();
        history.replace("/");
    }
    const submitHandler = (event)=>{
        event.preventDefault();
        let token = authCtx.token;
        fetch(' https://jobs-api.squareboat.info/api/v1/jobs/', {
            method: 'POST',
            body: JSON.stringify({
                title: enteredTitle,
                description: enteredDescription,
                location: enteredLocation
            })
            ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    console.log(data);
                    let errorMessage = data.message;
                    throw new Error(errorMessage);
                });
            }
        }).then(data => {

            console.log(data);
            setEnteredTitle('');
            setTitleIsValid(null);
            setEnteredDescription('');
            setDescriptionIsValid(null);
            setEnteredLocation('');
            setLocationIsValid(null);
            setFormIsValid(false);
            alert("Succesfully Posted a Job You can now go back to home page to see if job is posted or Not");

        }).catch(err => {
            console.log(err.message);
            setEnteredTitle('');
            setTitleIsValid(null);
            setEnteredDescription('');
            setDescriptionIsValid(null);
            setEnteredLocation('');
            setLocationIsValid(null);
            setFormIsValid(false);
            setErrorMessage(err.message);
        })

    }
    let titleSpan ='';
    let descriptionSpan = '';
    let locationSpan = '';

    let allSpan = '';

    let invalid1 =  `${
        titleIsValid === false ? classes.invalid : ''
    }`;
    let invalid2 =  `${
        descriptionIsValid === false ? classes.invalid : ''
    }`;
    let invalid3 = `${locationIsValid===false?classes.invalid:''}`;

    if(titleIsValid===false){
      if(titleIsValid===''){
        
        titleSpan = `This field is mandatory*`;
      }else{
        
        titleSpan=` Title Must be greater than 5 characters`;
      }
    }
  
    if(descriptionIsValid===false){
      if(descriptionIsValid===''){
        descriptionSpan=`this field is mandatory*`;
      }
      else{
        descriptionSpan=`Description must be greater than 15 characters`;
      }
    }

    if(locationIsValid===false){
        if(locationIsValid===''){
            locationSpan= `this field is mandatory`;
        }else{
            locationSpan=`Location must be greater than 3 characters`;
        }
    }

    if(titleIsValid === false && descriptionIsValid===false && locationIsValid===false){
         allSpan=`All fileds are mandatory*`;     
    }


    let initials = '';
    if(authCtx.email){
        initials=authCtx.email.charAt(0).toUpperCase();
    }
    return (
        <Layout>
            <div className={classes.post}>
                <form onSubmit={submitHandler}>
                    <span>Post</span>
                    <div
                        className={[classes.control, invalid1].join(' ')} 
                    >
                        <label htmlFor="Job Title">Job Title*</label>
                        <input
                            type="text"
                            id="title"
                            value={enteredTitle}
                            onChange={titleChangeHandler}
                            onBlur={validateTitleHandler}
                            placeholder="Enter the Job title"
                        />
                    </div>
                    <div
                        className={[classes.textarea, invalid2].join(' ')} 
                    >
                        <label htmlFor="Description">Description*</label>
                        <textarea
                            type="text"
                            id="description"
                            value={enteredDescription}
                            onChange={descriptionChangeHandler}
                            onBlur={validateDescriptionHandler}
                            placeholder="Enter Job Description"
                        />
                    </div>
                    <div
                        className={[classes.control, classes.control1, invalid3].join(' ')} 
                    >
                        <label htmlFor="location">Location*</label>
                        <input
                            type="text"
                            id="location"
                            value={enteredLocation}
                            onChange={locationChangeHandler}
                            onBlur={validateLocationHandler}
                            placeholder="Enter Job Location"
                        />
                    </div>
                    
                    <div className={classes.actions}>
                        <button type="submit" disabled={!formIsValid} >
                            Post
                        </button>
                    </div>
                </form>
            </div>
            <span className={[classes.error, classes.error1].join(' ')}>{titleSpan}</span>
            <span className={[classes.error, classes.error2].join(' ')}>{descriptionSpan}</span>
            <span className={[classes.error, classes.error3].join(' ')}>{locationSpan}</span>
            <span className={[classes.error, classes.error4].join(' ')}>{allSpan}</span>

            <span className={classes.backendError}>{errorMessage}</span>
            {/* Logout and Post Job navigation */}
            <div className={classes.userNavigation}>
                <span className={classes.jobPost}><Link to="/post">Post A Job</Link></span>
                <span className={classes.dot}>
                    <span>{initials}</span>
                </span>
                <span className={classes.logout} onClick={logoutHandler}>Logout</span>
            </div>
            {/* Side navigation */}
            <span className={classes.sideNavigation}>
                <Link to="/home">Home</Link>
                 <span>{'->'}</span>
                <Link to="/post">Post A Job</Link>
            </span>
            <span className={classes.homeIcon}>
                 <HomeIcon />
            </span>
             
        </Layout>
        
    )
}

export default Post;
