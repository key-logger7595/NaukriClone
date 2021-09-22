import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './LandingPage.module.css';
import image1 from '../../assets/image.png';
import logo1 from '../../assets/solaytic2.png';
import logo2 from '../../assets/goldline.png';
import logo3 from '../../assets/Infy.png';
import logo4 from '../../assets/liva.png';
import logo5 from '../../assets/ztos.png';
import logo6 from '../../assets/Kanbanize_logo.png';
 
const LandingComponent = () => {
    return (
        <div className={classes.main}>
            {/* main header with navbar */}
            <div className={classes.firstDiv}>
                {/* MyJobs title Div */}
                  
                <span className={classes.title}>
                     <span>My</span>
                     <span>Jobs</span>
                   
                </span>

                {/* Welcome to My Jobs */}
                <span className={classes.myJobs}>
                     <span>WelcomeTo</span><br/>
                     <span style={{color:'#ffffff'}}>My</span>
                     <span>Jobs</span>
                </span>
             
                {/* Get Started button */}
                <span className={classes.getStarted}>
                </span>
                <span className={classes.getStartedText}>GetStarted</span> 
                {/* Login Logout button */}

                <span className={classes.loginButton}>
                </span>
                <span className={classes.loginText}>
                        <NavLink to="/login" >Login/</NavLink>
                        <NavLink to="/Signup" >Signup</NavLink>
                </span>

                {/* cover image */}
                <span className={classes.imageCover}>
                    <img src={image1} alt="pic"/>
                </span>

            </div>
            {/* Why us component */}
            <span className={classes.why}>Why Us</span><br/>
               <div className={[classes.card, classes.card1].join(' ')}>
                 <div className={classes.headingContent}>
                  <span>GetMore</span><br/>
                  <span>Visisbility</span><br/>

                 </div>
                 <div className={classes.paraContent}>
                    <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                 </div>
               </div>
               <div className={[classes.card, classes.card2].join(' ')}>
                  <div className={classes.headingContent}>
                       <span>Organize Your</span><br/>
                       <span>Candidates</span><br/>

                     </div>
                    <div className={classes.paraContent}>
                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                    </div>
               </div>
               <div className={[classes.card, classes.card3].join(' ')}>
                   <div className={classes.headingContent}>
                     <span>Verify</span><br/>
                     <span>Their abilities</span><br/>

                    </div>   
                    <div className={classes.paraContent}>
                       <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                    </div>
                </div> 
               
            {/* Companies Who trust us  */}
            <span className={classes.Who}>Companies Who Trusts Us</span><br/>
            <div className={classes.thirdDiv}>
               <div className={classes.imageContainer}>
                <span className={classes.imageSpan}> <img src={logo1} alt="logo1"/></span>
                <span className={classes.imageSpan}> <img src={logo2} alt="logo1"/></span>
                <span className={classes.imageSpan}> <img src={logo1} alt="logo1"/></span>
                <span className={classes.imageSpan}> <img src={logo3} alt="logo1"/></span>
                <span className={classes.imageSpan}> <img src={logo4} alt="logo1"/></span>
                <span className={classes.imageSpan}> <img src={logo5} alt="logo1"/></span>
                <span className={classes.imageSpan}> <img src={logo2} alt="logo1"/></span>
                <span className={classes.imageSpan}> <img src={logo6} alt="logo1"/></span>
                <span className={classes.imageSpan}> <img src={logo3} alt="logo1"/></span>
                
                
                  

               </div>
            </div>
            <span className={classes.lineBorder}></span>
            
           
        </div>
    )
}
export default LandingComponent;