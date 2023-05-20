import Navbar from './Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Footer from './Footer';
import Registration from './pages/Registration';
import { Route, Routes } from 'react-router-dom';
import Useracount from './pages/Useracount';
import React, { useState, useEffect } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [userInfo, setUserInfo] = useState(null);

  const handleLogin = () => {
    // Perform login authentication here
    // If login is successful, update isLoggedIn to true
    setIsLoggedIn(true);
     // Store user information in local storage
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  const handleLogout = () => {
    // Perform logout logic here
    // Update isLoggedIn to false
    setIsLoggedIn(false);
     // Remove user information from local storage
  sessionStorage.removeItem('userData');

  };

    useEffect(() => {
    // Check if user information exists in local storage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} userInfo={userInfo}/>
      <div className='container'>
         <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
          <Route path='/newUser' element={<Registration />} />
           <Route path='/userInfo' element={<Useracount />} />
        </Routes>
      </div>
      <div className='footer'>
        <Footer />
     </div>
      
    </>
     
  );
}

export default App;
