const express = require("express");
const cors = require("cors");
const pool = require("./db");
const twilio = require("twilio");
const { getSms, createSms, updateSms, getFilteredSms } = require("./smsdb");
const knex = require("./knexConnection");

const sid = "ACe16a4cf68ce4c741ee08e2d8c8b191fa";
const token = "a53203e1351632298689d10301709200";
const phone = "+13073232443";

const app = express();

const client = twilio(sid, token);

app.use(cors());
app.use(express.json());

app.get("/history", async (req, res) => {
    try {
        getSms()
            .then((result) => {
                res.status(200);
                res.json(result);
            })
            .catch((error) => {
                res.status(400);
                res.write("there was a problem");
            });
    } catch (err) {
        console.log(err);
    }
});

app.get("/history/filter/", async (req, res) => {
    try {
        const { receiver, datefrom, dateto } = req.query;

        const data = await getFilteredSms(receiver, datefrom, dateto);
        console.log(data);
        res.status(200);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

app.post("/", async (req, res) => {
    const { from, to, message } = req.body;

    try {
        var id = await createSms({
            from,
            to,
            message,
            status: "in progress",
        });
        console.log("db created");

        await client.messages.create({
            body: message,
            from: phone,
            to: to,
        });
        console.log("twilio message sent");

        await updateSms(id[0], { status: "success" });

        console.log("db updated");

        res.status(400);
        res.end("Message was sent");
    } catch (error) {
        await updateSms(id[0], { status: "error" });

        res.status(400);
        res.end("There was a problem");
    } finally {
        res.end();
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
