import { useState, useEffect } from "react";
import validation from './Registervalidation';


const Registration = () => {
  const [values, setValues] = useState({
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    streetaddress: '',
    email: '',
    country: '',
    city: '',
    wage: ''
  })

  
  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    
    
  }

  const submitRegistration = async e => {
     e.preventDefault();
    const array = Object.values(values);
    try {
    
      console.log(array);
    const response = await fetch("http://localhost:3001/api/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
      body: JSON.stringify(array)
                
    })
    } catch (err) {
      console.error(err.message);
    }
  
  }
  
  const [errors, setError] = useState({})  

  function formCheck(e) {
    e.preventDefault();
    setError(validation(values));
  }



  useEffect((e) => {
    if (Object.keys(errors).length === 0 && (values.id !== "" && values.firstName !== "" && values.lastName !== "" && values.age !== "" && values.stradres !== "" && values.email !== "" && values.city !== "" && values.wage !== "" )) {
      
    }
  })

   

 return ( 
  <form onSubmit={formCheck} formMethod="POST" className="registration-form" >
   <h3 style={{paddingBottom: "7px"}}>Registration Form</h3>
     <input id="firstName" className="registration-form-input" placeholder="First Name" value={values.firstName} name="firstName" onChange={handleChange} /> <p />
     {errors.firstName && <p className="registration-error-message" id="id-error">{errors.firstName}</p>}
    <input id="lastName" className="registration-form-input" placeholder="Last Name" value={values.lastName} name="lastName" onChange={handleChange} /> <p />
     {errors.lastName && <p className="registration-error-message" id="id-error">{errors.lastName}</p>}
     <input id="age" name="age" value={values.age} onChange={handleChange} className="registration-form-input" placeholder="Age" />
     {errors.age && <p className="registration-error-message"  id="id-error">{errors.age}</p>}
     <input id="stradress" name="streetaddress" className="registration-form-input" placeholder="Street Address"  onChange={handleChange} value={values.streetaddress} />
     {errors.stradress && <p className="registration-error-message"  id="id-error">{errors.stradress}</p>}
     <input name="email" id="email" className="registration-form-input" placeholder="E-mail" onChange={handleChange} value={values.email} />
     {errors.email && <p className="registration-error-message"  id="id-error">{errors.email}</p>}
     <input name="city" id="city" className="registration-form-input" placeholder="City" onChange={handleChange} value={values.city} />
     {errors.city && <p className="registration-error-message"  id="id-error">{errors.city}</p>}
     <input name="country" id="country" className="registration-form-input" placeholder="Country"
       onChange={handleChange} value={values.country} /> 
     {errors.country && <p className="registration-error-message"  id="id-error">{errors.country}</p>}
     <input name="wage" id="wage" className="registration-form-input" placeholder="Monthly Income"
       onChange={handleChange} value={values.wage} /> <p />
     {errors.wage && <p className="registration-error-message" id="id-error">{errors.wage}</p>}
     <input id="userid" className="input-login-registration" placeholder="User ID" value={values.id} name="id" onChange={handleChange}/> <p />
        {/* {errors.id && <p id="id-error" className="login-error-message">{errors.id}</p>} 
      <input id="password" className="input-login-registration" type="password" placeholder="Password" value={values.password} name="password" onChange={handleChange}
         {errors.password && <p className="login-error-message">{errors.password}</p>*/} 
   <button className="registration-btn" onClick={submitRegistration} type={"submit"}>Send Registration Form</button>
  </form>
  );
}
 
export default Registration;