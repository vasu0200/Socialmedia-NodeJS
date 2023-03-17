const mysql=require("mysql2/promise");


exports.pool  = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER ,
    database:process.env.DB_NAME ,
    password:process.env.DB_PASS,
    waitForConnections: true,
    connectionLimit:process.env.DB_MAXCONN ,
    queueLimit: 0
  });