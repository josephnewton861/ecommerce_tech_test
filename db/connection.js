const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let con;
let host;

if(process.env.CLEARDB_DATABASE_URL) {
    console.log('here',
     process.env.DB_PROD_HOSTNAME, process.env.DB_PROD_USER, process.env.DB_PROD_PASSWORD, process.env.DB_PROD_HOST, 
     process.env.DB_PROD_PORT);
    host = process.env.DB_HOST_PROD;
    // con = mysql.createConnection({
    //     host: process.env.DB_PROD_HOSTNAME,
    //     user: process.env.DB_PROD_USER,
    //     password: process.env.DB_PROD_PASSWORD,
    //     database: process.env.DB_PROD_HOST,
    //     port: process.env.DB_PROD_PORT,
    //     multipleStatements: true
    // });
   con = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)
//    con.connect();
} else {
    con = mysql.createConnection({
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        port: process.env.DB_PORT,
        multipleStatements: true
    });
    host = process.env.DB_HOST
}
const testPassword = process.env.TEST_PASSWORD


module.exports = {con, host, testPassword};