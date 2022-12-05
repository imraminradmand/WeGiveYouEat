"use strict";

module.exports.register = (app, database) => {
  app.get("/", async (req, res) => {
    res.status(200).send("API is running...\nfollow routes to get info").end();
  });

  // Get all posts +
  // Get only longitude, latitude, date, and post id of all posts
  app.get("/api/posts", async (req, res) => {
    let opt2 = req.query["opt2"];
    let query;
    if (typeof opt2 !== "undefined" && opt2 === "T") {
      query = database.query("select longitude, latitude, id, date from posts;");
      const records = await query;
      res.status(200).send(JSON.stringify(records)).end();
    } else {
      query = database.query("select * from posts");
      const records = await query;
      res.status(200).send(JSON.stringify(records)).end();
    }
  });

  // Get all posts for a given user
  app.get("/api/posts/user/:userid", async (req, res) => {
    let id = req.params.userid;
    let query;

    query = database.query("SELECT * FROM posts WHERE user_uid like ?", [id]);
    const records = await query;
    if (JSON.stringify(records) === "[]") {
      res.status(404).send({
        success: false,
        error: {
          message: "No post found for user",
        },
      });
    } else {
      res.status(200).send(JSON.stringify(records)).end();
    }
  });

  // Get post given the post id
  app.get("/api/posts/post/:postid", async (req, res) => {
    let id = req.params.postid;
    let query;

    query = database.query("SELECT * FROM posts WHERE id=?", [id]);
    const records = await query;
    if (JSON.stringify(records) === "[]") {
      res.status(404).send({
        success: false,
        error: {
          message: "No post found for user",
        },
      });
    } else {
      res.status(200).send(JSON.stringify(records)).end();
    }
  });

  // Get user info given uid
  app.get("/api/users/:uid", async (req, res) => {
    let id = req.params.uid;
    let query;

    query = database.query("SELECT * FROM users WHERE uid like?", [id]);
    const records = await query;
    if (JSON.stringify(records) === "[]") {
      res.status(404).send({
        success: false,
        error: {
          message: "No user found",
        },
      });
    } else {
      res.status(200).send(JSON.stringify(records)).end();
    }
  });

  // Add a user to the users table
  app.post("/api/users", async (req, res) => {
    let uid = req.body.uid;
    let fullName = req.body.fullName;
    let email = req.body.email;
    let phone = req.body.phone;

    if (
      typeof uid === "undefined" ||
      typeof fullName === "undefined" ||
      typeof email === "undefined" ||
      typeof phone === "undefined"
    ) {
      res.status(400).send({
        success: false,
        error: {
          message: "Missing field",
        },
      });
    } else {
      let query = database.query(
        "INSERT INTO users (uid, fullname, email, phone) VALUES (?, ?, ?, ?)",
        [uid, fullName, email, phone]
      );
      const records = await query;
      const message = `{
                "status": "successful",
            }`;
      res.status(200).send(message).end();
    }
  });

  // Add post to posts table
  app.post("/api/posts", async (req, res) => {
    let postName = req.body.postName;
    let description = req.body.description;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    let phoneNumber = req.body.phoneNumber;
    let useruid = req.body.useruid;
    let address = req.body.address;
    let date = req.body.date

    if (
      typeof postName === "undefined" ||
      typeof description === "undefined" ||
      typeof longitude === "undefined" ||
      typeof latitude === "undefined" ||
      typeof phoneNumber === "undefined" ||
      typeof useruid === "undefined" ||
      typeof address === "undefined" ||
      typeof date === "undefined"
    ) {
      res.status(400).send({
        success: false,
        error: {
          message: "Missing field",
        },
      });
    } else {
      let query = database.query(
        "INSERT INTO posts (postName, description, address, longitude, latitude, phone, user_uid, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          postName,
          description,
          address,
          longitude,
          latitude,
          phoneNumber,
          useruid,
          date
        ]
      );
      const records = await query;
      const message = `{
            "status": "successful",
        }`;
      res.status(200).send(message).end();
    }
  });

  // Delete user
  app.delete("/api/delete/users/:id", async (req, res) => {
    let id = req.params.id;
    const checkIdExistsQuery = database.query(
      "select * from users where uid=?",
      [id]
    );
    const idCheckResult = await checkIdExistsQuery;
    if (JSON.stringify(idCheckResult) === "[]") {
      res.status(404).send({
        success: false,
        error: {
          message: "No such id exists",
        },
      });
    } else {
      if (typeof id !== "undefined") {
        let query = database.query("delete from users where uid=?", [id]);
        const records = await query;

        const message = `{"status": Successful}`;
        res.status(200).send(message).end();
      }
    }
  });

  // Delete post
  app.delete("/api/delete/posts/:id", async (req, res) => {
    let id = req.params.id;
    const checkIdExistsQuery = database.query(
      "select * from posts where id=?",
      [id]
    );
    const idCheckResult = await checkIdExistsQuery;
    if (JSON.stringify(idCheckResult) === "[]") {
      res.status(404).send({
        success: false,
        error: {
          message: "No such id exists",
        },
      });
    } else {
      if (typeof id !== "undefined") {
        let query = database.query("delete from posts where id=?", [id]);
        const records = await query;

        const message = `{"status": Successful}`;
        res.status(200).send(message).end();
      }
    }
  });

  // Update user information
  app.patch("/api/patch/users", async (req, res) => {
    const id = req.body.uid;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    let query;
    const checkIdExistsQuery = database.query(
      "select * from users where uid=?",
      [id]
    );
    const idCheckResult = await checkIdExistsQuery;

    console.log(email);
    if (JSON.stringify(idCheckResult) === "[]") {
      res.status(404).send({
        success: false,
        error: {
          message: "No such id exists",
        },
      });
    } else {
      if (typeof id !== "undefined") {
        if (
          typeof phone !== "undefined" &&
          typeof phone === "string" &&
          typeof email !== "undefined" &&
          typeof email === "string" &&
          typeof name !== "undefined" &&
          typeof name === "string"
        ) {
          query = database.query(
            "update users set phone=?, fullName=?, email=? where uid=?",
            [phone, name, email, id]
          );
          const records = await query;
          const message = `{"status": Successful, "phone number":${phone}, "name": ${name}, "email": ${email}}`;
          res.status(200).send(message).end();
        } else {
          if (typeof name !== "undefined" && typeof name === "string") {
            query = database.query("update users set fullname=? where uid=?", [
              name,
              id,
            ]);
            const records = await query;
            const message = `{"status": Successful, "name":${name}}`;
            res.status(200).send(message).end();
          } else if (
            typeof email !== "undefined" &&
            typeof email === "string"
          ) {
            query = database.query("update users set email=? where uid=?", [
              email,
              id,
            ]);
            const records = await query;
            const message = `{"status": Successful, "email":${email}}`;
            res.status(200).send(message).end();
          } else if (
            typeof phone !== "undefined" &&
            typeof phone === "string"
          ) {
            query = database.query("update users set phone=? where uid=?", [
              phone,
              id,
            ]);
            const records = await query;
            const message = `{"status": Successful, "phone number":${phone}}`;
            res.status(200).send(message).end();
          } else if (
            typeof phone !== "undefined" &&
            typeof phone === "string"
          ) {
            query = database.query("update users set phone=? where uid=?", [
              phone,
              id,
            ]);
            const records = await query;
            const message = `{"status": Successful, "phone number":${phone}}`;
            res.status(200).send(message).end();
          } else {
            res.status(400).send({
              success: false,
              error: {
                message: "Non valid input",
              },
            });
          }
        }
      } else {
        res.status(400).send({
          success: false,
          error: {
            message: "Missing quantity",
          },
        });
      }
    }
  });
};