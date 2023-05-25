import Navbar from './Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Footer from './Footer';
import Registration from './pages/Registration';
import { Route, Routes } from 'react-router-dom';
import Useracount from './pages/Useracount';
import React, { useState, useEffect } from 'react';
import Updateuserinfo from './pages/Updateuserinfo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = (userData) => {
    setUserInfo(userData);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('userData');
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} userInfo={userInfo} />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path='/newUser' element={<Registration />} />
          <Route path='/userInfo' element={<Useracount isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout}/>} />
          <Route path='/updateuserinfo' element={<Updateuserinfo />} />
        </Routes>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
