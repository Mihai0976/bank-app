import { useState, useEffect } from "react";
//import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import validation from './Loginvalidation';

const Login = ({ handleLogin } ) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: "",
    password: ""
  });
  
  const [loginStatus, setLoginStatus] = useState("");

  function handleChange(e) {
    const newValue = { ...values };
    newValue[e.target.name] = e.target.value;
    setValues(newValue);
  }

  const submitRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      
      if (response.ok) {
        console.log("Login successful!");
        setLoginStatus("success");
        // Perform any additional actions for successful login
         //return <Navigate to="./userinfo" />; // Redirect to the dashboard page
         handleLogin(); // Update login state in the parent component
        navigate("/userInfo")
      } else {
        console.log("Login failed!");
        setLoginStatus("failed");
        // Perform any additional actions for failed login
      }
      
    } catch (err) {
      console.error(err.message);
    }
  };

  const [errors, setError] = useState({});

  function formCheck(e) {
    e.preventDefault();
    setError(validation(values));

    if (Object.keys(errors).length === 0 && values.id !== "" && values.password !== "") {
      submitRegistration(e); // Call submitRegistration function when there are no errors
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && values.id !== "" && values.password !== "") {
      // Your logic here
    }
  }, [errors, values]);

  return (
    <div>
      <div className="login">
        <div className="title-bank-login">
          <h2>Consens</h2>
          <h2 className="h1Bank">Bank</h2>
        </div>

        <p className="login-title">Log In</p>
        <form onSubmit={formCheck} formMethod="post">
          <input id="userid" className="input-login" placeholder="User ID" value={values.id} name="id" onChange={handleChange} /> <p />
          {errors.id && <p id="id-error" className="login-error-message">{errors.id}</p>}
          <input id="password" className="input-login" type="password" placeholder="Password" value={values.password} name="password" onChange={handleChange} /> <p />
          {errors.password && <p className="login-error-message">{errors.password}</p>}
          <button className="login-btn" type="submit" value="Login">Login</button>
        </form>

        {loginStatus === "success" && <p>Login successful!</p>}
        {loginStatus === "failed" && <p>Login failed!</p>}
      </div>
      <button className="new-client-btn">New to us? <a href="./newUser">Create new account</a></button>
    </div>
  );
};

export default Login;
