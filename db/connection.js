const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createPool({
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_HOST,
        port: process.env.DB_PORT,
    });




host = process.env.DB_HOST

const testPassword = process.env.TEST_PASSWORD

module.exports = {con, host, testPassword};