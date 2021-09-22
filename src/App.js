
import React, { useContext } from 'react';
import {BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SignUpPage from  './pages/SignUpPage'; 
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import LandingPage from './pages/Landing';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import { AuthContext } from './store/auth-Context';


//only do route rendering here 
function App() {
  const authContext = useContext(AuthContext);

  return (
    <Router>
      <Switch>
         <Route path="/" exact>
           {authContext.isLoggedIn && <Redirect to="/home"/>}
           {!authContext.isLoggedIn && <LandingPage/>}
         </Route>
         <Route path="/forget" component={ForgetPasswordPage}/>
         <Route path="/reset" component={ResetPasswordPage}/>
         <Route path="/login">
           {authContext.isLoggedIn && <Redirect to="/home"/>}
           {!authContext.isLoggedIn && <LoginPage/>}
         </Route>
         <Route path="/Signup">
          {authContext.isLoggedIn && <Redirect to="/home"/>}
          {!authContext.isLoggedIn && <SignUpPage/>}
         </Route>
         <Route path="/home">
          {authContext.isLoggedIn && <HomePage/>}
          {!authContext.isLoggedIn && <Redirect to="/login"/>}
         </Route>
         <Route path="/post">
         {authContext.isLoggedIn && <PostPage/>}
          {!authContext.isLoggedIn && <Redirect to="/login"/>}
         </Route>
         <Route path='*'>
          <Redirect to='/'/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
