import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Useracount = ({ handleLogin, isLoggedIn, handleLogout }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
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
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userInfo) {
      fetchUserData();
    }
  }, [isLoggedIn, userInfo]);


    const handleRemoveAccount = async () => {
    try {
      const userId = userInfo.userid;
      const response = await fetch(`http://localhost:3001/api/user/delete/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Account removed successfully, perform necessary actions
        navigate("/"); // Redirect to home or login page
        // Clear local storage and reset state if needed
       localStorage.removeItem("userInfo");
        setUserInfo(null);
        handleLogout();
        
        alert("Your account has been removed.");
      } else {
        console.log("Failed to remove account");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!userInfo) {
    return null; // Return null if userInfo is not available yet
  }

  return (
    <div className="user-info-container"> 
      {userInfo && (
        <div className="user-info-wrapper">
          <div className="userInfo">
            <button className="update-userInfo-button" onClick={() => navigate("/updateuserinfo")}>{isLoggedIn && "Update your info"}</button>
            <button className="update-userInfo-button" onClick={handleRemoveAccount}>{isLoggedIn && "Remove Acount"}</button>
            <p>User info</p>
            <p>ID: {userInfo.userid}</p>
            <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
            <p>Email: {userInfo.email}</p>
            <p>Street Address: {userInfo.streetaddress} </p>
            <p>City: {userInfo.city}</p>
            <p>Country: {userInfo.country}</p>
          </div>
          <div className="loan-form">
            <form action="">
              <h3>Loan Application</h3>
              <input className="loan-form-input" type="text" placeholder="Ammount" />
              <input className="loan-form-input" type="text" placeholder="Period" />
               <div className="loan-form-checkbox-container">
                <input className="loan-form-checkbox" type="checkbox" id="termsCheckbox" />
                <label htmlFor="termsCheckbox">I agree to the terms and conditions</label>
              </div>
              <button className="loan-btn">Aply For Looan</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Useracount;

