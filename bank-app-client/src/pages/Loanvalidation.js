const Loanvalidation = (values) => {
  let errors = {};
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (storedUserInfo && storedUserInfo.wage) {
    // Access the wage property
    const mywage = storedUserInfo.wage;

    let periodMonts = values.period * 12;
    const interest = (values.loanAmount * (10 * 0.01)) / periodMonts;
    const payment = ((values.loanAmount / periodMonts) + interest).toFixed(2);

    if (payment > mywage * 0.1) {
      errors.payment = "The monthly loan repayment exceeds the allowed amount from your wage!";
    }
  } else {
    // Handle the case when storedUserInfo or storedUserInfo.wage is null
    console.log("Error: wage is not available");
  }

  if (!values.loanAmount) {
    errors.loanAmount = "Loan amount required!";
  } else if (values.loanAmount < 1000) {
    errors.loanAmount = "The loan amount is too big!";
  } else if (values.loanAmount > 5000) {
    errors.loanAmount = "The loan amount is too big!";
  }

  if (!values.period) {
    errors.period = "Period required!";
  } else if (values.period > 5) {
    errors.period = "Please fill in a period of time between 1 to 5 years!";
  } else if (values.period < 1) {
    errors.period = "Please fill in a period of time between 1 to 5 years!";
  }

  if (!values.agreeTerms) {
    errors.agreeTerms = "You have to agree with the terms and conditions!";
  }

  return errors;
};

export default Loanvalidation;
