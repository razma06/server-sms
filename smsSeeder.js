const { createSms } = require("./smsdb");

const smsData = [
    {
        from: "Cryptal",
        to: "2348030000000",
        message: "Hello, this is a test message",
        status: "success",
    },
    {
        from: "Cryptal",
        to: "2348030000000",
        message: "Hello, second message",
        status: "error",
    },
    {
        from: "Cryptx",
        to: "2348030000000",
        message: "Hello, third message",
        status: "in progress",
    },
];

smsData.forEach((sms) => {
    createSms(sms)
        .then((res) => console.log(res))
        .catch((error) => console.log("error"));
});
