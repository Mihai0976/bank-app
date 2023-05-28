const Registrationvalitation = (values) => {
 let errors = {}
 

if (!values.firstName) {
 errors.firstName = "First Name required!";
 }

 if (!values.lastName) {
 errors.lastName = "Last Name required!";
 }
 
 if(!values.age) {
 errors.age = "Age required!";
 }else if (values.age < 21) {
  errors.age = "You must be at least 21 year old!";
 }
 
 if(!values.streetaddress) {
 errors.streetaddress = "Street Address required!";
 }

 if(!values.email) {
 errors.email = "E-mail address required!";
 }

 if(!values.city) {
 errors.city = "City required!";
 }

 if(!values.country) {
 errors.country = "Country required!";
 }else if (values.country !== "Finland") {
  errors.country = "You  must live in Finland!";
 }

 if(!values.wage) {
 errors.wage = "Monthly income required!";
 }

 if (!values.id) {
  errors.id = "User ID required !"
 }
 

  if (!values.password) {
  errors.password = "Password required !"
 }
 else if (values.password.length !== 4) {
  errors.password = "The Password must be composed by 4 char!"
 }

 return errors;
}
 
export default Registrationvalitation;