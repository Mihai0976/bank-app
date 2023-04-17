import Navbar from './Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
           <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <div className='footer'>
        <Footer />
     </div>
      
    </>
     
  );
}

export default App;
