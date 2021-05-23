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

const get = async (sql, params) => {
    return await query(sql, params);
}

const save = async (sql, params) => {
    return await query(sql, params);
}

const remove = async(sql, params) => {
    return await query(sql, params, (err) => {
        const msg = err ? "Unable to remove as there could be role / employee associated to this entity you are trying to remove"
                        : "Removed successfully";

        console.log(msg);
      });
}

connection.connect((err) => {
    if (err) throw err;
  });

module.exports = {save, get, remove}

