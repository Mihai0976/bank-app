const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql");

const db = mysql.createConnection({
 host: 'localhost',
  database:'consensbank',
 user: 'root',
 password: 'root123'

})
let value = 0;
app.post("/api/login", (req, res) => {
 const sqlInsert = "INSERT INTO userinfo (?, ?, ?, ?, ?, ?,?)";
 db.query(sqlInsert, (id, firstName, lastName, email, streetaddress, counntry, city, wage) => {});
 })

app.listen(3001, () => {
 console.log("Running on port 3001");
})