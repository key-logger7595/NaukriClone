import React, { useState,useEffect,useContext } from 'react';
import { AuthContext } from '../../store/auth-Context';
import Layout1 from '../UI/Layout1';
import classes from './Home.module.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NoJobs from './NoJobs';
import Pagination from '../Pagination/Pagination';
const Home = () => {

     const[jobs,setJobs] = useState([]);
     const[loading,setLoading] = useState(true);
     const[error,setError] = useState(null);
     const authCtx = useContext(AuthContext);
     const[limit,setLimit] = useState(7);
     const[currentPage,setCurrentPage] = useState(1);


     useEffect(()=>{
        //fetching jobs;
         let token = authCtx.token;
         fetch(' https://jobs-api.squareboat.info/api/v1/recruiters/jobs', {
             method: 'GET',
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
             console.log(data.data);
             
             
             setLoading(false);
             setJobs(data.data.data);
             console.log(data);

         }).catch(err => {
             console.log(err.message);
             setLoading(false);
             setError(err.message);
         })
     },[])

    const changeCurrentPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    let h1 = <h1>Fetching jobs for You....</h1> ;  
    let error1 = <h1>{error}</h1>;


    let fileterdJobs = jobs;
    let numberofPage = Math.ceil(fileterdJobs.length / limit);
        let pageNumberArr = []
        for (let i = 0; i < numberofPage; i++) {
            pageNumberArr.push(i + 1);
        }
        // impliment
        let si = (currentPage - 1) * limit;
        let eidx = si + limit;
        fileterdJobs = fileterdJobs.slice(si, eidx);


    return (
        <Layout1>
          <h3 className={classes.jobTitle}>Jobs Posted by You</h3>  
          {loading && h1}
          {!loading && jobs.length===0 && !error  &&  <NoJobs/> }
         
         { !loading && <div className={classes.flexContainer}>
              { fileterdJobs && fileterdJobs.map((card,index)=>{
                  return (
                      <div className={classes.card} key={card.key}>
                          <h6 className={classes.title}>{card.title}</h6>
                          <p className={classes.description}>{card.description}</p>

                          <span className={classes.Icon}><LocationOnIcon /></span>
                          <span className={classes.location}>{card.location}</span>


                          <span className={classes.viewApplications}> <span>View Applications</span></span>
                      </div>
                  )
              })} 
           </div>}

           <Pagination pageNumberArr={pageNumberArr} currentPage={currentPage} changeCurrentPage={changeCurrentPage} />
           {!loading && error1}

        </Layout1>
    )
}

export default Home;
