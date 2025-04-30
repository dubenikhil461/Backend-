const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true })); // for form 
app.use(express.json()); // for json format in post

app.get("/register", (req, res) => {
  //get method show the username password in url and it is limited get by query not body
  const { username, password } = req.query;
  console.log(`${(username, password)}`);
  res.send(`${username} is registered`);
});

app.post("/register", (req, res) => {
  // for post method it is encoded hence we use middleware to understand the encoded url to express , get by body not query
  const { username, password } = req.body;
  console.log(`${username} and ${password}`);
  res.send(`${username} is registered`);
});

app.listen(8080, () => {
  console.log(`listening on port http://localhost:${8080}`);
});




