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
  const country = req.body.country;
  const city = req.body.city;
  const wage = req.body.wage;
 // const password = req.body.password;
  console.log(id);
  const sqlInsert = "INSERT INTO userinfo (id, firstName, lastName, email, streetaddress, country, city, wage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const userinfo = await db.query(sqlInsert, [id, firstName, lastName, email, streetaddress, country, city, wage], (err, result) => {
   console.log(result);
  });
 } catch (error) {
  console.error(error.message);
 }

});

app.post("/api/login", async (req, res) => {
  try {
    const id = req.body.id;
    var password = req.body.password;
    const passwordHashed = hash.MD5(password);

   const sqlLogin = "SELECT * FROM consensbank.user WHERE userid = ? AND password = ?";
    const userLogin = await db.query(sqlLogin, [id, passwordHashed], (err, result) => {
      console.log(result);
      console.log("Login succesfull!");
   })
 
 } catch (error) {
   console.error(error.message);
   res.json("Login Failed");
 }
});




app.get("/api/user", (req, res) => {

  let sql = "SELECT * from user";

  db.query(sql, (err, result) => {

    if (err) throw err;

    res.send(result);

  });

});

app.get("/api/userinfo", (req, res) => {

  const sql = "SELECT * FROM userinfo";

  db.query(sql, (err, result) => {
    console.log(result);
  });

});

app.listen(3001, () => {
 console.log("Running on port 3001");
})