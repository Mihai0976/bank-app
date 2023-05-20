
const Useracount = () => {

// Access additional user data from sessionStorage
const userAdditionalData = JSON.parse(sessionStorage.getItem("userAdditionalData"));

 return ( 
  <div className="user-info-container">
   <p>User info</p>
  </div>
  );
}
 
export default Useracount;