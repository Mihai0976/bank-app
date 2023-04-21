
const Login = () => {
 return ( 
  
  <div>
     <div className="login">
      
      <div className="title-bank-login"><h2>Consens</h2><h2 className="h1Bank">Bank</h2></div> 
       
     <p className="login-title"> Log In</p>
      <form onSubmit={formCheck} formMethod="get" > 
         <input id="userid" className="input-login" placeholder="User ID" /> <p />
         <p id="id-error" className="login-error-message">User ID required !</p>
         <input id="password" className="input-login" type="password" placeholder="Password" /> <p />
         <p className="login-error-message">Password required !</p>
        <input className="login-btn" type={"submit"} value={"Login"}/>
     </form>
     </div>
     <button className="new-client-btn">New to us? <a href="">Create new acount</a> </button>
   </div>
  );
}

var formCheck = () => {
  if (document.getElementById("userid") === "") {
    document.getElementById("id-error").style.visibility = "visible";
    return false; 
  }
  if (document.getElementById("password") === "") {
    document.getElementById("login-error-message").style.visibility = "visible";
    return false;
  }
}
 
export default Login;