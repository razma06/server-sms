const {
    getSms,
    updateSms,
    createSms,
    deleteEverything,
    getSmsById,
    deleteSms,
} = require("./smsdb");
const knex = require("./knexConnection");
const request = require("supertest");

describe("smsdb", () => {
    it("should get all sms", async () => {
        const sms = await getSms();
        return expect(sms).toHaveLength(2);
    });

    it("get sms by id", async () => {
        const sms = await getSmsById(33);
        return expect(sms[0].id).toBe(33);
    });

    it("should update sms", async () => {
        const sms = await updateSms(33, { to: "+123456789" });
        console.log(sms);
        return expect(sms).toBe(1);
    });

    it("should delete sms", async () => {
        const deletedSms = await deleteSms(33);

        return expect(deletedSms).toBe(1);
    });

    it("should reise error", async () => {
        const deletedSms = await deleteSms(33);

        return expect(deletedSms).toBe(0);
    });
});
