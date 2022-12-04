"use strict";

const express = require("express");
const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json({
  limit: '50mb'
}));

app.use((req, res, next) => {
  res.set("Content-Type", "application/json");
  next();
});

const startServer = async (_) => {
  const database = require("./src/db");
  let db = await database.setup();

  const routes = require("./src/routes");
  routes.register(app, db);


  const PORT = process.env.PORT || 8081;
  const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
  });
  process.on("unhandledRejection", (err) => {
    console.error(err);
    throw err;
  });

  return server;
};

startServer();