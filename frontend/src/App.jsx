import React,{useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from './store';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Completed from './components/Completed/Completed'
import Signup from './components/Registration/Signup'
import SignIn from './components/Registration/Signin'

import Home from './components/Home/Home'
import Watch from './components/Watchlist/Watch';


const App = () => {

  const dispatch = useDispatch(); 

  useEffect(() => {
    const id = sessionStorage.getItem("id"); 
    if(id){
      dispatch(authActions.login());  
    }
    
  }, [])

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/watchlist' element={<Watch />} />
          <Route exact path='/completed' element={<Completed />} />
          <Route exact path='/Signup' element={<Signup />} />
          <Route exact path='/Signin' element={<SignIn />} /> 

        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App