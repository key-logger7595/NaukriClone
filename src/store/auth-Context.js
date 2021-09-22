import React, { useState } from 'react';
export const AuthContext = React.createContext({
  token:'',
  isLoggedIn:false,
  login:(token)=>{},
  logout:()=>{},
  resetToken:'',
  isResetTokenPresent:false,
  updateResetToken:()=>{},
  clearResetToken:()=>{},
  email:'',

})
export const AuthContextProvider = (props) =>{
  
    //for Auth Persistance on Refresh 
    let initialToken = localStorage.getItem('token');
    let initialEmail = localStorage.getItem('Email');
    const [token,setToken] = useState(initialToken);
    const [resetToken,setResetToken] = useState(null);
    const [email,setEmail] = useState(initialEmail);
    const isLoggedIn = !!token;
     ;
    const isResetTokenPresent = !!resetToken;

    const loginHandler = (token,email) =>{
        
        setToken(token);
        setEmail(email)
        //Adding token to local Storage 
        localStorage.setItem('token', token);
        localStorage.setItem('Email',email);
    }

    const logoutHandler = ()=>{
        setEmail(null);
        setToken(null);
        //Removing token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('Email');

    }
    const updateResetToken = (resetToken)=>{
        setResetToken(resetToken);
    }
    const clearResetToken = ()=>{
        setResetToken(null);
    }

    const contextvalue = {
        token:token,
        isLoggedIn:isLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
        resetToken:resetToken,
        updateResetToken:updateResetToken,
        isResetTokenPresent:isResetTokenPresent,
        clearResetToken:clearResetToken,
        email:email
    }
    return <AuthContext.Provider value={contextvalue}>
        {props.children}
    </AuthContext.Provider>
}



