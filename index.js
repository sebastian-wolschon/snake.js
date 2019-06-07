const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/js"));

app.get("/", (req, res) => {
  res.send();
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
