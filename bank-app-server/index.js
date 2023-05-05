const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql");

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

/*app.get("/api/user", async (req, res) => {
 try {
  const allusers = await db.query("SELECT * FROM consensbank.user");
  res.json(allusers.rows);
  //res.send(allusers);
 } catch (error) {
   console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
 }
});*/


app.get("/api/user", (req, res) => {

  let sql = "SELECT * from user";

  db.query(sql, (err, result) => {

    if (err) throw err;

    res.send(result);

  });

});

app.listen(3001, () => {
 console.log("Running on port 3001");
})