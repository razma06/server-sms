const express = require("express");
const cors = require("cors");
const pool = require("./db");
const twilio = require("twilio");

const sid = "AC8e000f6abb9424633a7ea6722c262bdf";
const token = "bae84d440eef8db4a4a4e7ea71849310";
const phone = "+16623378459";

const app = express();

const client = twilio(sid, token);

app.use(cors());
app.use(express.json());

app.get("/history", async (req, res) => {
    try {
        await pool.connect();
        await pool
            .query("SELECT * FROM sms")
            .then((result) => {
                res.json(result.rows);
            })
            .catch((err) => {
                console.log(err);
                res.status(400);
                res.write("There was a problem");
            })
            .finally(() => {
                res.end();
            });
    } catch (err) {
        console.log(err);
    }
});

app.get("/history/filter/", async (req, res) => {
    try {
        const { receiver, datefrom, dateto } = req.query;

        await pool.connect();
        await pool
            .query(
                "SELECT * FROM sms WHERE receiver = $1 AND date between $2 AND $3",
                ["+" + receiver.trim(), datefrom, dateto]
            )
            .then((result) => {
                res.json(result.rows);
            })
            .catch((err) => {
                console.log(err);
                res.status(400);
                res.write("There was a problem");
            })
            .finally(() => {
                res.end();
            });
    } catch (err) {
        console.log(err);
    }
});

app.post("/", (req, res) => {
    const { sender, mess, tel } = req.body;
    client.messages
        .create({
            body: mess,
            from: phone,
            to: tel,
        })
        .then(async (message) => {
            await pool.connect();
            await pool
                .query(
                    `INSERT INTO "sms" ("sender", "receiver", "message", "date" ) VALUES ($1, $2, $3, $4)`,
                    [sender, tel, mess, new Date()]
                )
                .then((response) => res.write("Message was sent"))
                .catch((err) => console.log(err));
        })
        .catch((err) => {
            console.log(err);
            res.status(400);
            res.write("There was a problem");
        })
        .finally(() => {
            res.end();
        });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
