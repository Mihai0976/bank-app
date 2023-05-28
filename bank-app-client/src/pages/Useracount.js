import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validation from './Loanvalidation';

const Useracount = ({ handleLogin, isLoggedIn, handleLogout }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [loanData, setLoanData] = useState(null);
  const [values, setValues] = useState({
    loanAmount: '',
    period: '',
    agreeTerms: false,
  });
  const [registerStatus, setLoanStatus] = useState('');

  function handleChange(e) {
    const newValue = { ...values };
    newValue[e.target.name] = e.target.value;
    setValues(newValue);
  }

  const [errors, setError] = useState({});

  const submitLoan = async (e) => {
    e.preventDefault();
    //const array = Object.values(values);
    try {
      if (loanData && loanData.loanId !== 'None') {
        setError({ loanExists: 'You already have a loan. Please contact the bank for more information.' });
      } else { 
      const userId = userInfo.userid;
      const response = await fetch(`http://localhost:3001/api/loan/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log('Loan Granted!');
        setLoanStatus('success');
        alert('Loan granted you will be sent more information about the loan!');
        // Perform any additional actions for successful login
        navigate('/login');
      } else {
        console.log('Loan aplication failed!');
        setLoanStatus('failed');
        // Perform any additional actions for failed login
      }
    }
    } catch (err) {
      console.error(err.message);
    }
  };

  function formCheck(e) {
    e.preventDefault();
    // const validationErrors = validation(values, userInfo);
    setError(validation(values));

    if (
      Object.keys(errors).length === 0 &&
      values.loanAmount !== '' &&
      values.period !== '' &&
      values.agreeTerms
    ) {
      submitLoan(e); // Call submitLoan function when there are no errors
    }
  }

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = userInfo.userid;
      const response = await fetch(`http://localhost:3001/api/user/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUserInfo(userData);
        handleLogin(userData);
      } else {
        console.log('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userInfo) {
      fetchUserData();
      fetchLoanData();
    }
  }, [isLoggedIn, userInfo]);

  const handleRemoveAccount = async () => {
    try {
      const userId = userInfo.userid;
      const response = await fetch(
        `http://localhost:3001/api/user/delete/${userId}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        // Account removed successfully, perform necessary actions
        navigate('/'); // Redirect to home or login page
        // Clear local storage and reset state if needed
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        handleLogout();

        alert('Your account has been removed.');
      } else {
        console.log('Failed to remove account');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!userInfo) {
    return null; // Return null if userInfo is not available yet
  }

  const fetchLoanData = async () => {
    try {
      const userId = userInfo.userid;
      const response = await fetch(
        `http://localhost:3001/api/loandata/${userId}`
      );
      if (response.ok) {
        const loanData = await response.json();
        setLoanData(loanData);
      } else {
        console.log('Failed to fetch loan data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='user-info-container'>
      {userInfo && (
        <div className='user-info-wrapper'>
          <div className='userInfo'>
            <button
              className='update-userInfo-button'
              onClick={() => navigate('/updateuserinfo')}
            >
              {isLoggedIn && 'Update your info'}
            </button>
            <button
              className='update-userInfo-button'
              onClick={handleRemoveAccount}
            >
              {isLoggedIn && 'Remove Acount'}
            </button>
            <p>User info</p>
            <p>ID: {userInfo.userid}</p>
            <p>
              Name: {userInfo.firstName} {userInfo.lastName}
            </p>
            <p>Email: {userInfo.email}</p>
            <p>Street Address: {userInfo.streetaddress} </p>
            <p>City: {userInfo.city}</p>
            <p>Country: {userInfo.country}</p>
            {loanData && loanData.loanId !== 'None' ? (
              <div>
                <p>Loan Id: {loanData.loanid}</p>
                <p>Loan Amount: {loanData.loanamount}€</p>
                <p>Period: {loanData.period}</p>
              </div>
            ) : (
              <>
                <div>
                <p>Loan Id: No active loans</p>
                <p>Loan Amount: 0</p>
              </div>
                {/* Hide the Loan Amount and Period fields */}
              </>
            )}
          </div>
          <div className='loan-form'>
            <form onSubmit={formCheck} method='POST'>
              <h3>Loan Application</h3>
              <input
                id='loanAmount'
                name='loanAmount'
                value={values.loanAmount}
                className='loan-form-input'
                type='text'
                placeholder='Fill in Loan ammount 1000-5000 '
                onChange={handleChange}
              />
              <p />
              {errors.loanAmount && (
                <p id='id-error' className='login-error-message'>
                  {errors.loanAmount}
                </p>
              )}
              <input
                id='period'
                name='period'
                value={values.period}
                className='loan-form-input'
                type='text'
                placeholder='Period 1-5 years'
                onChange={handleChange}
              />
              <p />
              {errors.period && (
                <p id='id-error' className='login-error-message'>
                  {errors.period}
                </p>
              )}
              <div className='loan-form-checkbox-container'>
                <input
                  className='loan-form-checkbox'
                  type='checkbox'
                  id='agreeTerms'
                  name='agreeTerms'
                  value={values.agreeTerms}
                  onChange={handleChange}
                />
                <label htmlFor='termsCheckbox'>
                  I agree to the terms and conditions
                </label>
                <p />
                {errors.agreeTerms && (
                  <p id='id-error' className='login-error-message'>
                    {errors.agreeTerms}
                  </p>
                )}
                {errors.loanExists && (
  <p className='login-error-message'>{errors.loanExists}</p>
)}
              </div>
              <button className='loan-btn'>Aply For Looan</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Useracount;
