import React from 'react';
import classes from './Layout.module.css';

const Layout = (props) => {
    return (
        <div className={classes.main}>
             <div className={classes.firstDiv}>
                {/* MyJobs title */}
                <span className={classes.title}>
                     <span>My</span>
                     <span>Jobs</span>
                   
                </span>
            </div>
            {props.children}
            <span className={classes.lineBorder}></span>
        </div>
    )
}

export default Layout;
