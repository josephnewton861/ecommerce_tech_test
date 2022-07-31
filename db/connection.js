const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const host = process.env.DB_PROD_HOST
let con;

if(process.env.DATABASE_URL) {
   con = mysql.createPool(process.env.DATABASE_URL)
}  else {
    con = mysql.createPool(process.env.LOCAL_DB_URL)
}
const testPassword = process.env.TEST_PASSWORD

module.exports = {con, host, testPassword};