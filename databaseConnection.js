const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: '34.123.234.76',
    user: 'mysql_user',
    password: 'MySql@2024',
    database: 'code_brew',
    waitForConnections: true,
    connectionLimit: 100, // Adjust the connection limit as needed
    queueLimit: 0,
  });

  module.exports = connection;