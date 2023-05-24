import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validation from './Registervalidation';

const Updateuserinfo = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    streetaddress: '',
    email: "",
    country: "",
    city: "",
    wage: ""
  });

  const [registerStatus, setRegisterStatus] = useState("");
 const [errors, setError] = useState({});
 

  function handleChange(e) {
    const newValue = { ...values };
    newValue[e.target.name] = e.target.value;
    setValues(newValue);
  }

  const userId = JSON.parse(sessionStorage.getItem("userData")).userid;
  const submitRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/update/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        console.log("User Info updated!");
        setRegisterStatus("success");
        navigate("/userInfo");
      } else {
        console.log("User info update failed!");
        setRegisterStatus("failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  function formCheck(e) {
    e.preventDefault();
    setError(validation(values));

    if (
      Object.keys(errors).length === 0 &&
      values.firstName !== "" &&
      values.lastName !== "" &&
      values.age !== "" &&
      values.streetaddress !== "" &&
      values.email !== "" &&
      values.city !== "" &&
      values.wage !== ""
    ) {
      submitRegistration(e);
    }
  }

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
       {registerStatus === "success" && <p>Update Info successful!</p>}
       {registerStatus === "failed" && <p>Update Info failed!</p>}
     <button className="update-btn" type={"submit"}>Send Update Info Form</button>
  </form>
  );
}
 
export default Updateuserinfo;