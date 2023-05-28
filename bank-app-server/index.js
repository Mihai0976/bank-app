const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const hash = require('object-hash');
const session = require('express-session');


const db = mysql.createConnection({
  host: 'localhost',
  database: 'consensbank',
  user: 'root',
  password: 'root123',
});
db.connect((err) => {
  if (err) throw err;
  console.log('MySql Connected...');
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));


app.post('/api/loan/:userId', async (req, res) => {
  const userId = req.params.userId; // Retrieve user ID from the session object
  const loanAmount = req.body.loanAmount;
  const period = req.body.period;
  const loanSql = 'INSERT INTO loan(userid, loanamount, period) VALUES(?, ?, ?);';
  db.query(loanSql, [userId, loanAmount, period], (err, result) => {
    if (err) {
      console.error(err.stack);
      return res.status(500).json('An error occurred');
    } else {
      console.log(result);
      return res.status(200).json('Loan granted!');
    }
  });
});

app.post('/api/register', async (req, res) => {
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
    const hashPassword = hash.MD5(password);
    const sqlInsert =
      'INSERT INTO user (userid, password, firstName, lastName, email, streetaddress, country, city, wage)  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);';

    //console.log(sqlInsert);
    db.query(
      sqlInsert,
      [
        id,
        hashPassword,
        firstName,
        lastName,
        email,
        streetaddress,
        country,
        city,
        wage,
      ],
      (err, result) => {
        if (err) {
          console.error(err.message);
          res.json('Login Failed');
        } else {
          if (result.length !== 0) {
            console.log('Login successful!');
            const user = result[0];
            //res.send(result);
            res.status(200).json(user);
          } else {
            console.log('Login failed!');
            res.status(401).json('Invalid credentials');
          }
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json('An error occurred while processing the login');
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const id = req.body.id;
    const password = req.body.password;
    const passwordHashed = hash.MD5(password);
    console.log('Hashed Password:', passwordHashed); // Log the hashed password
    const sqlLogin ='SELECT userid, firstName, lastName, email, streetaddress, country, city, wage FROM user WHERE userid = ? AND password = ?';
    
    
    const userLogin = await db.query(
      sqlLogin,
      [id, passwordHashed],
      (err, result) => {
        if (err) {
          console.error(err.message);
          res.json('Login Failed');
        } else {
          if (result.length !== 0) {
            console.log('Login successful!');
            const user = result[0];
            //res.send(result);
            res.status(200).json(user);
          } else {
            console.log('Login failed!');
            res.status(401).json('Invalid credentials');
          }
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json('An error occurred while processing the login');
  }
});

app.get('/api/user', (req, res) => {
  let sql = 'SELECT * from user';

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

app.get('/api/user/:userId', (req, res) => {
  const userId = req.params.userId;
 let sql = 'SELECT * FROM user  WHERE userid = ?';
 
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json('An error occurred while fetching user data');
    } else {
      if (result.length > 0) {
        const userData = result[0];
        res.json(userData);
      } else {
        res.status(404).json('User not found');
      }
    }
  });
});

app.get('/api/loandata/:userId', (req, res) => {
  const userId = req.params.userId;
  let sql = 'SELECT * FROM loan WHERE userid = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json('An error occurred while fetching user data');
    } else {
      if (result.length > 0) {
        const loanData = result[0];
        res.json(loanData);
      } else {
        // User has no loan data
        const emptyLoanData = {
          loanId: 'None',
          loanAmount: 'None',
        };
        res.json(emptyLoanData); // Send the emptyLoanData object as the response
      }
    }
  });
});



app.post('/api/update/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName, email, streetaddress, city, country, wage } =
      req.body;

    const sqlUpdate =
      'UPDATE user SET firstName = ?, lastName = ?, email = ?, streetaddress = ?, country = ?, city = ?, wage = ? WHERE userId = ?';

    db.query(
      sqlUpdate,
      [firstName, lastName, email, streetaddress, country, city, wage, userId],
      (err, result) => {
        if (err) {
          console.error(err.stack);
          return res
            .status(500)
            .json({ error: 'An error occurred', message: err.message });
        } else {
          console.log(result);
          return res.status(200).json('Update successful');
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json('An error occurred while processing the request');
  }
});

app.delete('/api/user/delete/:userId', (req, res) => {
  const userId = req.params.userId;
  const sqlDeleteUser = 'DELETE FROM user WHERE userId = ?';
  db.query(sqlDeleteUser, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json('An error occurred while trying to delete user!');
    } else {
      if (result.affectedRows > 0) {
        res.json('User deleted successfully');
      } else {
        res.status(404).json('User not found');
      }
    }
  });
});

app.listen(3001, () => {
  console.log('Running on port 3001');
});
