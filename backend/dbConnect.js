const mysql = require('mysql2');

// MySQL Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // Use environment variable or default to localhost
  user: process.env.DB_USER || 'root',      // Use environment variable or default to root
  password: process.env.DB_PASSWORD || '',   // Use environment variable or default to empty
  database: process.env.DB_NAME || 'itransition', // Use environment variable or default to 'itransition'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;