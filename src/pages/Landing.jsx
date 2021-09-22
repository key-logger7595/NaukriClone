import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import LandingComponent from '../components/LandingPage/LandingComponent';
const Landing = () => {
    return (
         <div>
              <LandingComponent/>     
              <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
        </div>
    )
}

export default Landing
