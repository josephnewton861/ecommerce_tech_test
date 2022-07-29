const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();


// let host;
if(process.env.CLEARDB_DATABASE_URL) {
    const host = process.env.DB_HOST_PROD;
    //console.log('here',
    //  process.env.DB_PROD_HOSTNAME, process.env.DB_PROD_USER, process.env.DB_PROD_PASSWORD, process.env.DB_PROD_HOST, 
    //  process.env.DB_PROD_PORT);
//     console.log('IN CLEAR DB')
//    const con = mysql.createConnection({
//         host: process.env.DB_PROD_HOSTNAME,
//         user: process.env.DB_PROD_USER,
//         password: process.env.DB_PROD_PASSWORD,
//         database: process.env.DB_PROD_HOST,
//         port: process.env.DB_PROD_PORT,
//         multipleStatements: true
//     });
   const con = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)
//    con.connect();
    const testPassword = process.env.TEST_PASSWORD
    module.exports = {con, host, testPassword};
} 
// else {
//     con = mysql.createConnection({
//         host: process.env.DB_HOSTNAME,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB,
//         port: process.env.DB_PORT,
//         multipleStatements: true
//     });
//     host = process.env.DB_HOST
// }