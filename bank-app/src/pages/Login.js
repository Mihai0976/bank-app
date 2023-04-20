
const Login = () => {
 return ( 
  
  <div>
     <div className="login">
      
      <div className="title-bank-login"><h2>Consens</h2><h2 className="h1Bank">Bank</h2></div> 
       
     <p className="login-title"> Log In</p>
      <form> 
        <input className="input-login" type="email" placeholder="User ID"/><p />
        <input className="input-login" type="password" placeholder="Password"/><p />
        <input className="login-btn" type={"submit"} value={"Login"}/>
     </form>
     </div>
     <button className="new-client-btn">New to us? <a href="">Create new acount</a> </button>
   </div>
  );
}
 
export default Login;