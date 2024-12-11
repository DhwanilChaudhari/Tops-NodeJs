const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const PORT = 10000;
const geocode = require("../util/geoCode");
const weather = require("../util/weather");

const viewPath = path.join(__dirname, "../Templates/views");
const partialPath = path.join(__dirname, "../Templates/partials");
const publicPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicPath));

app.get("/", (req, resp) => {
  resp.render("index");
});

app.get("/weather", (req, resp) => {
  const city = req.query.city;
  geocode
    .GeoCodeData(city)
    .then((data) => {
      weather.WeatherData(data.lat, data.lng).then((result) => {
        resp.send({
          City: result.City,
          Lat: data.lat,
          Lng: data.lng,
          Temp: result.Temp,
          Pressure: result.Pressure,
          Humidity: result.Humidity,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
