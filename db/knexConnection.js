const knex = require("knex");

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "./db/sms.sqlite3",
    },
});

module.exports = connectedKnex;
