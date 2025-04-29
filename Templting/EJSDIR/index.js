const express = require("express");
const app = express();
const path = require("path");
const port = 2345;

app.set("view engine", "ejs");

// if server run outside view folder, express  join it in like bckend/templting/ejsdir => __dirname/views it find home.ejs
app.set("views", path.join(__dirname, "views"));

// in ejs response render not send,mens send ejs file templte
app.get("/", (req, res) => {
  // bydefult express serch the home.ejs in views dir
  res.render("home", {
    title: "Welcome Page",
    name: "nikhil",
    date: new Date().toDateString(),
  });
});

// instgrm ejs
app.get("/ig/:username", (req, res) => {
  const followers = ["nikhil", "dubey", "bced"];
  const { username } = req.params;
  res.render("instgrm", { username ,followers});
});
//listen the port
app.listen(port, () => {
  console.log("server running port " + port);
});
