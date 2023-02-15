const knex = require("./knexConnection");

knex.schema
    .dropTable("sms")
    .then(() => {
        console.log("Table dropped");
    })
    .catch(() => {
        console.log("Table not dropped");
    })
    .finally(() => {
        knex.destroy();
    });
