"use strict";

const express = require("express");
const app = express();
app.use(express.json());
app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
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


  const PORT = process.env.PORT || 8080;
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