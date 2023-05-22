import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Useracount = ({ handleLogin, isLoggedIn }) => {
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    // Access the user ID from sessionStorage
    const userId = JSON.parse(sessionStorage.getItem("userData")).userid;

    // Fetch user data from the server based on the ID
    const fetchUserData = async () => {
      try {
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

    fetchUserData();
  }, []);

  return (
    <div className="user-info-container"> 
      {userInfo && (
        <div className="userInfo">
           <button className="update-userInfo-button" onClick={() => navigate("/updateuserinfo")}>
   {isLoggedIn && "Update your info"}
</button>

          <p>User info</p>
          <p>ID: {userInfo.userid}</p>
          <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
          <p>Email: {userInfo.email}</p>
          <p>Street Address: {userInfo.streetaddress} </p>
          <p>City: {userInfo.city}</p>
          <p>Country: {userInfo.country}</p>
        </div>
      )}
    </div>
  );
};

export default Useracount;
