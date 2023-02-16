const { getSms, updateSms, createSms, deleteEverything } = require("./smsdb");
const knex = require("./knexConnection");

getSms()
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
    .finally(() => {
        knex.destroy();
    });

// deleteEverything()
//     .then(() => {
//         console.log("deleted");
//     })
//     .catch(() => {
//         console.log("error");
//     })
//     .finally(() => {
//         knex.destroy();
//     });

// updateSms(10, { status: "error" })
//     .then((res) => console.log(res))
//     .catch((error) => console.log(error))
//     .finally(() => {
//         knex.destroy();
//     });
