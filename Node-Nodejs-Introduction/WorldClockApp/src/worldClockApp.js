const express = require("express");
const moment = require("moment-timezone");
const app = express();
const port = 20000;

const timeZones = [
  { name: "Surat", tz: "India/Gujarat" },
  { name: "London", tz: "Europe/London" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "New York", tz: "America/New_York" },
  { name: "Dubai", tz: "Asia/Dubai" },
];

app.get("/api/time", (req, res) => {
  const { zone } = req.query;

  if (!zone) {
    return res.status(400).send({ error: "Please provide a valid time zone." });
  }

  try {
    const currentTime = moment().tz(zone).format("YYYY-MM-DD HH:mm:ss");
    res.send({ time: currentTime, timeZone: zone });
  } catch (err) {
    res.status(400).send({ error: "Invalid time zone." });
  }
});

app.get("/api/worldclock", (req, res) => {
  const times = timeZones.map(({ name, tz }) => ({
    city: name,
    timeZone: tz,
    currentTime: moment().tz(tz).format("YYYY-MM-DD HH:mm:ss"),
  }));

  res.send(times);
});

app.listen(port, () => {
  console.log(
    `World Clock App running at http://localhost:20000/api/worldclock`
  );
});
