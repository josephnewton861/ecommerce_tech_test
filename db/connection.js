const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let con;
let host;

if (process.env.CLEARDB_DATABASE_URL) {
    con = process.env.CLEARDB_DATABASE_URL;
    host = process.env.DB_HOST_PROD;
    console.log('hereeeee');
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