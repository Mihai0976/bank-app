import Navbar from './Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Footer from './Footer';
import Registration from './pages/Registration';
import { Route, Routes } from 'react-router-dom';
import Useracount from './pages/Useracount';
import React, { useState } from 'react';

function App() {

 const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login authentication here
    // If login is successful, update isLoggedIn to true
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here
    // Update isLoggedIn to false
    setIsLoggedIn(false);
  };

  return (
    
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
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
