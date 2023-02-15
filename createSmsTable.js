const knex = require("./knexConnection");

knex.schema
    .createTable("sms", function (table) {
        table.increments("id");
        table.string("from", 20);
        table.string("to", 20);
        table.string("message", 160);
        table.string("status", 20);
        table.timestamps(true, true);
    })
    .then(() => {
        console.log("Table created");
    })
    .catch(() => {
        console.log("Table not created");
    })
    .finally(() => {
        knex.destroy();
    });
