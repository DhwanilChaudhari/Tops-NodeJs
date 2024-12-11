const axios = require("axios");

const GeoCodeData = (city, callback) => {
  const URL = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=faed4d9eb29d483a866000c901ccb680`;

  return new Promise((resolve, reject) => {
    axios
      .get(URL)
      .then((result) => {
        const data = result.data.results[0].geometry;
        lat = data.lat;
        lng = data.lng;

        resolve({ lat, lng });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports = { GeoCodeData };
