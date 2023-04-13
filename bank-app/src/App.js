import Navbar from './Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Footer from './Footer';

function App() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = App
      break
    case "/home":
      Component = Home
      break
    case "/about":
      Component = About
      break
    case "/login":
      Component = Login
      break
  }
  return (
    <>
      <Navbar />
      <div className='container'>
        <Component />
      </div>
      <div className='footer'>
        <Footer />
      </div>
      
    </>
     
  );
}

export default App;
