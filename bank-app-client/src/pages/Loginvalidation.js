const Loginvalidation = (values) => {
 let errors = {}
 
 if (!values.id) {
  errors.id = "User ID required !"
 }
 else if (values.id.length !== 8) {
  errors.id = "The user ID must be composed by 8 char!"
 }

  if (!values.password) {
  errors.password = "Password required !"
 }
 else if (values.password.length !== 4) {
  errors.password = "The Password must be composed by 4 char!"
 }

 return errors;
}
 
export default Loginvalidation;