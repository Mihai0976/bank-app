const Loginvalidation = (values) => {
 let errors = {}
 
 if (!values.id) {
  errors.id = "User ID required !"
 }


  if (!values.password) {
  errors.password = "Password required !"
 }
 

 return errors;
}
 
export default Loginvalidation;