const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql");
const db = mysql.createConnection({
 host: 'localhost',
 database: 'consensbank',
 user: 'root',
 password: 'root123'

});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/register", (req, res) => {

 const id = req.body.id;
 const firstName = req.body.firstName;
 const lastName = res.body.lastName;
 const email = req.body.email;
 const streetaddress = req.body.streetaddress;
 const country = req.body.country;
 const city = req.body.city;
 const wage = req.body.wage;
 const password = req.body.password;

 const sqlInsert = "INSERT INTO userinfo (id, FirstName, LastName, email, streetaddress, country, city, wage) VALUES (?, ?, ?, ?, ?, ?, ?) INTO user(userId, password) VALUES (?, ?)";
 db.query(sqlInsert, [id, firstName, lastName, email, streetaddress, country, city, wage, password], (err, result) => {
  console.log(result);
 });
});

app.listen(3001, () => {
 console.log("Running on port 3001");
})