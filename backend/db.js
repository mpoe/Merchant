var mysql = require('mysql');
const dbcon = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: ""
});

// dbcon.test = () => {}


module.exports = dbcon;