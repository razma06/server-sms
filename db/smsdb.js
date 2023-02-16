const connectedKnex = require("./knexConnection");

function createSms(sms) {
    return connectedKnex("sms").insert(sms);
}

function getSms() {
    return connectedKnex("sms").select("*");
}

function getSmsById(id) {
    return connectedKnex("sms").select("*").where({ id });
}

function updateSms(id, sms) {
    return connectedKnex("sms").where({ id }).update(sms);
}

function deleteSms(id) {
    return connectedKnex("sms").where({ id }).del();
}

function getFilteredSms(to, datefrom, dateto) {
    return connectedKnex("sms")
        .select("*")
        .where(to ? { to: "+" + to.trim() } : true)
        .whereBetween("created_at", [
            datefrom || "1963-01-01",
            dateto || "2200-01-01",
        ]);
}

function deleteEverything() {
    return connectedKnex("sms").del();
}

module.exports = {
    createSms,
    getSms,
    getSmsById,
    updateSms,
    deleteSms,
    deleteEverything,
    getFilteredSms,
};
