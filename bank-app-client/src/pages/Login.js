import { useState, useEffect } from "react";
import validation from './Loginvalidation';

const Login = () => {
  const [values, setValues] = useState({
    id: "",
    password: ""
  })
  

  function handleChange(e) {
    const newValue = { ...values };
    newValue[e.target.name] = e.target.value;
    setValues(newValue);
  }
  
   const submitRegistration = async e => {
     e.preventDefault();
     
    try {
    
      //console.log(array);
               const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
                
    })
    } catch (err) {
      console.error(err.message);
    }
  
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
      <form onSubmit={formCheck} formMethod="post" > 
         <input id="userid" className="input-login" placeholder="User ID" value={values.id} name="id" onChange={handleChange}/> <p />
         {errors.id && <p id="id-error" className="login-error-message">{errors.id}</p>} 
         <input id="password" className="input-login" type="password" placeholder="Password" value={values.password} name="password" onChange={handleChange}/> <p />
         {errors.password && <p className="login-error-message">{errors.password}</p>} 
        <input className="login-btn" type={"submit"} onClick={submitRegistration} value={"Login"}/>
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