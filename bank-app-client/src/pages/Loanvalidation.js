const Loanvalidation = (values) => {
 let errors = {}

 if (!values.loanAmount) {
  errors.loanAmount ="Loan amount required!"
 }else if (values.loanAmount < 1000 ) {
  errors.loanAmount = "The loan ammount is to big!"
 }else if ( values.loanAmount > 5000) {
  
 }

if (!values.period) {
 errors.period ="Period required!"
}else if (values.period > 5 ) {
 errors.period = "Please fill in a period of time between 1 to 5 years!"
}else if (values.period < 1 ) {
 errors.period = "Please fill in a period of time between 1 to 5 years!"
 }
 
 if (!values.agreeTerms) {
  errors.agreeTerms = "You have to agree with the terms and conditions!"
 }

 return errors;
}
 
export default Loanvalidation;