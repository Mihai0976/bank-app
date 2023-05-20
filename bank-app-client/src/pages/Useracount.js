import React, { useEffect, useState } from "react";

const Useracount = () => {
  const [userInfo, setUserInfo] = useState(null);

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
      <p>User info</p>
      {userInfo && (
        <div>
          <p>ID: {userInfo.userid}</p>
          <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
          <p>Email: {userInfo.email}</p>
          <p>Address: {userInfo.streetaddress}, {userInfo.city}, {userInfo.country}</p>
          {/* Display other user information as needed */}
        </div>
      )}
    </div>
  );
};

export default Useracount;
