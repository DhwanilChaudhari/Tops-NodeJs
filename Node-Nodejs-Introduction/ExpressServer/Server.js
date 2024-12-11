const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, resp) => {
  resp.send("Hello World");
});

app.get("/about", (req, resp) => {
  resp.send("About");
});

app.get("/contact", (req, resp) => {
  resp.send("Contact");
});

app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
