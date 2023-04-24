import { useState, useEffect } from "react";
import validation from "./Validation";

const Login = () => {
  const [values, setValues] = useState({
    id: '',
    password: ''
  })
  

  function handleChange(e) {
    setValues({...values, [e.target.name]: e.target.value})
  }
  

  const [errors, setError] = useState({})

  function formCheck(e) {
    e.preventDefault();
    setError(validation(values));
    /*setValues(...values, [e.target.name], e.target.placeholder);*/
  }

  useEffect((e) => {
    if (Object.keys(errors).length === 0 && (values.id !== "" && values.password !== "")) {
    }
  }, [errors])

   
  

 return ( 
  <div>
     <div className="login">
      
      <div className="title-bank-login"><h2>Consens</h2><h2 className="h1Bank">Bank</h2></div> 
       
     <p className="login-title"> Log In</p>
      <form onSubmit={formCheck} formMethod="get" > 
         <input id="userid" className="input-login" placeholder="User ID" value={values.id} name="id" onChange={handleChange}/> <p />
         {errors.id && <p id="id-error" className="login-error-message">{errors.id}</p>} 
         <input id="password" className="input-login" type="password" placeholder="Password" value={values.password} name="password" onChange={handleChange}/> <p />
         {errors.password && <p className="login-error-message">{errors.password}</p>} 
        <input className="login-btn" type={"submit"}  value={"Login"}/>
     </form>
     </div>
     <button className="new-client-btn">New to us? <a href="./newUser">Create new acount</a> </button>
   </div>
  );
}

/*var formCheck = () => {
  if (document.getElementById("userid") === "") {
    document.getElementById("id-error").style.visibility = "visible";
    return false; 
  }
  if (document.getElementById("password") === "") {
    document.getElementById("login-error-message" ).style.visibility = "visible";
    return false;
  }
}*/
 
export default Login;