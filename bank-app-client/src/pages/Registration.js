const Registration = () => {
 return ( 
  
  <form className="registration-form" action="">
   <h3 style={{paddingBottom: "15px"}}>Registration Form</h3>
   <input className="registration-form-input" placeholder="First Name" /> <p />
   <input className="registration-form-input" placeholder="Last Name" />
   <input className="registration-form-input" placeholder="Age" />
   <input className="registration-form-input" placeholder="Street Adress" />
   <input className="registration-form-input" placeholder="E-mail" />
   <input className="registration-form-input" placeholder="City" />
   <input className="registration-form-input" placeholder="Monthly Income" /> <p />
   <button className="registration-btn" type={"submit"}>Send Registration Form</button>
  </form>
  );
}
 
export default Registration;