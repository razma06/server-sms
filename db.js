const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "razmaclassic",
    host: "localhost",
    port: 5432,
    database: "smshistory",
});

module.exports = pool;
