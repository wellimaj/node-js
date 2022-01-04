const express = require("express");
const mongoose = require("mongoose");
const user = require("./userSchema");
const bodyparser = require("body-parser");
var methodOverride = require("method-override");
const faker = require("faker");
mongoose.connect("mongodb://localhost:27017/assignment_4");
const app = express();
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyparser());
app.set("views", "./views");
app.set("view engine", "ejs");
// async function generate() {
//   const fakearr = [];
//   for (var i = 0; i < 10; i++) {
//     fakearr.push({
//       name: faker.name.findName(),
//       email: faker.internet.email(),
//       isPromoted: null,
//     });
//   }
//   await user.create(fakearr);
// }
// generate();
app.get("/", async (req, res) => {
  //write the code to fetch the data
  var data = await user.find();
  res.render("index", { data });
});
app.put("/users/:id/", async (req, res) => {
  await user.updateOne({ _id: req.params.id }, [
    { $set: { isPromoted: { $not: "$isPromoted" } } },
  ]);
  res.redirect("/");
});
app.get("/form", async (req, res) => {
  res.render("form");
});
app.post("/users/add", async (req, res) => {
  newuser = {
    name: req.body.name,
    email: req.body.email,
    isPromoted: null,
  };
  await user.create(newuser);
  res.redirect("/");
});
app.delete("/users/:id/", async (req, res) => {
  await user.deleteOne({ _id: req.params.id });
  res.redirect("/");
});
app.listen(3000, () => console.log("Server is listening"));
