const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql");
const hash = require('object-hash');

const db = mysql.createConnection({
 host: 'localhost',
 database: 'consensbank',
 user: 'root',
 password: 'root123',
});
db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/register", async (req, res) => {
 try {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const streetaddress = req.body.streetaddress;
  const city = req.body.city;
  const country = req.body.country;
  const wage = req.body.wage;
  const password = req.body.password;
  const hashPassword = hash.MD5(password)
  const sqlInsert = "INSERT INTO user (userid, password, firstName, lastName, email, streetaddress, country, city, wage)  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);";

   //console.log(sqlInsert);
   db.query(sqlInsert, [id, hashPassword, firstName, lastName, email, streetaddress, country, city, wage], (err, result) => {
     if (err) {
       console.error(err.stack);
      es.status(500).json("An error occurred");
     } else {
       console.log(result);
       res.status(200).json("Registration successful");
    }
  });
 } catch (error) {
   console.error(error.message);
   res.status(500).json("An error occurred while processing the request");
 }

});

app.post("/api/login", async (req, res) => {
  try {
    const id = req.body.id;
    const password = req.body.password;
    const passwordHashed = hash.MD5(password);
    console.log("Hashed Password:", passwordHashed); // Log the hashed password
     const sqlLogin = "SELECT userid, firstName, lastName, email, streetaddress, country, city, wage FROM user WHERE userid = ? AND password = ?";
    const userLogin = await db.query(sqlLogin, [id, passwordHashed], (err, result) => {
      if (err) {
        console.error(err.message);
        res.json("Login Failed");
      } else {
        if (result.length !== 0) {
          console.log("Login successful!");
           const user = result[0];
          //res.send(result);
          res.status(200).json(user);
        } else {
          console.log("Login failed!");
           res.status(401).json("Invalid credentials");
        }
      }
    });
  } catch (error) {
    console.error(error.message);
     res.status(500).json("An error occurred while processing the login");
  }
});





app.get("/api/user", (req, res) => {

  let sql = "SELECT * from user";

  db.query(sql, (err, result) => {

    if (err) throw err;

    res.send(result);

  });

});

app.get("/api/user/:userId", (req, res) => {
  const userId = req.params.userId;
  let sql = "SELECT * FROM user WHERE userid = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json("An error occurred while fetching user data");
    } else {
      if (result.length > 0) {
        const userData = result[0];
        res.json(userData);
      } else {
        res.status(404).json("User not found");
      }
    }
  });
});




app.listen(3001, () => {
 console.log("Running on port 3001");
})