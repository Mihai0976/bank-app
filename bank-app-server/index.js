const express = require('express');
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
 host: 'localhost',
  database:'consensbank',
 user: 'root',
 password: 'root123'

})
let value = 0;
app.get("/", (req, res) => {
 value++;
 /*const sqlInsert = "INSERT INTO user (id, password) VALUES ('12345678', '1234')";
 db.query(sqlInsert, (err, result) => {
  if (er) throw err; 
  res.send("info created" + value);*/
 db.connect(function (err) {
  if (err) {
   console.error('Error connecting! ' + err.stack);
   return;
  }
  console.log('Connected as id' + db.threadId)
 });
 })

app.listen(3001, () => {
 console.log("Running on port 3001");
})