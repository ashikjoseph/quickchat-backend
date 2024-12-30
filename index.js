const path = require('path');
const express = require("express");
const { app, server } = require("./quickchat/socket/socket");
const router = require("./quickchat/Routes/router");
require("dotenv").config();
require("./quickchat/DB/connection");

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(router);
// app.use(express.static(path.join(__dirname, "/quickchat/build")));

const port = 5000;

app.get("/", (res) => {
  res.send("quickChat Running...");
});

server.listen(port, () => {
  console.log(`Server is successfully running at: ${port}`);
});
