import React,{useContext} from 'react';
import classes from './Layout1.module.css';
import { AuthContext } from '../../store/auth-Context';
import { useHistory,Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

const Layout1 = (props) => {

    const authCtx = useContext(AuthContext);
    const history= useHistory();
    let initials ;
    if(authCtx.email){
        initials=authCtx.email.charAt(0).toUpperCase();
    }

    const logoutHandler = ()=>{
        authCtx.logout();
        history.replace("/");
    }
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
       <span className={classes.lineBorder}>

       </span>
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
            </span>
            <span className={classes.homeIcon}>
                 <HomeIcon />
            </span>
   </div>
    )
}
export default Layout1;
