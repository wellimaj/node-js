const express = require("express");
const faker = require("faker");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
var users = [];
for (let i = 0; i < 3; i++) {
  users.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
  });
}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { users });
});
app.get("/form", (req, res) => {
  res.render("form");
});
app.post("/user/add", (req, res) => {
  users.push({
    name: req.body.names,
    email: req.body.email,
  });
  //console.log(users);
  res.redirect("/");
});
app.listen(3000);
