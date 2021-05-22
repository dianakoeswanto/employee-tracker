const mysql = require("mysql");
const util = require("util");

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Alexa2013",
    database: "employee_tracker"
});

const query = util.promisify(connection.query).bind(connection)

const get = async (sql) => {
    // try{
        return await query(sql);
    // } finally {
        // connection.end();
    // }
}

const save = async (sql, params) => {
    return await query(sql, params);
}

const remove = async(sql, params) => {
    return await query(sql, params);
}

connection.connect((err) => {
    if (err) throw err;
  });

module.exports = {save, get, remove}

