const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: process.env.DB_PORT,
    multipleStatements: true
});
const testPassword = process.env.TEST_PASSWORD

const host = process.env.DB_HOST

module.exports = {con, host, testPassword};