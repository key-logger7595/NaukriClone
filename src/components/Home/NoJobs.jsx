import React from 'react';
import classes from './NoJobs.module.css';
import Description from '@material-ui/icons/Description';
import { Link } from 'react-router-dom';

const NoJobs = (props) => {
    return (
        <div className={classes.group}>
            <div className={classes.outer}>
               <span className={classes.icon}>
                  <Description svgIcon="thumbs-up" inline="true"/>
               </span><br/>
               <span className={classes.text}>
                   Your posted jobs will show here!
               </span><br/>
               <span className={classes.Post}>
                  <span><Link to="/post">Post</Link></span>
               </span>
             </div>
        </div>
    )
}

export default NoJobs;
