const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();


// let host;
const host = process.env.DB_PROD_HOST
let con;
// console.log('here',
//  process.env.DB_PROD_HOSTNAME, process.env.DB_PROD_USER, process.env.DB_PROD_PASSWORD, process.env.DB_PROD_HOST, 
//  process.env.DB_PROD_PORT);
if(process.env.DATABASE_URL) {
//     const host = process.env.DB_HOST_PROD;
//     console.log('IN CLEAR DB')
//    const con = mysql.createPool({
//         host: process.env.DB_PROD_HOSTNAME,
//         user: process.env.DB_PROD_USER,
//         password: process.env.DB_PROD_PASSWORD,
//         database: process.env.DB_PROD_HOST,
//         port: process.env.DB_PROD_PORT,
//         multipleStatements: true
//     });
   con = mysql.createPool(process.env.DATABASE_URL)
}  else {
    con = mysql.createPool(process.env.LOCAL_DB_URL)
}
const testPassword = process.env.TEST_PASSWORD

module.exports = {con, host, testPassword};