const express = require("express");
const app = express();
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
app.use(express.json());
mongoClient.caller(url, (err, db) => {
  if (err) {
    console.log("Error while connecting mongo client");
  } else {
    const myDb = db.db("myDb");
    const collection = myDb.collection("course");
    app.post("/signup", (req, res) => {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      const query = { email: newUser.email };

      collection.findOne(query, (err, result) => {
        if (res == null) {
          collection.insertOne(newUser, (err, result) => {
            res.status(200).send();
          });
        } else {
          res.status(400).send();
        }
      });
    });
    app.post("/login", (req, res) => {
      const query = {
        email: req.body.emai,
        password: req.body.password,
      };
      collection.findOne(query, (err, result) => {
        if (result != null) {
          const objTosend = {
            name: result.name,
            email: result.email,
          };
          res.status(200).send(JSON.stringify(objTosend));
        } else {
          res.status(400).send();
        }
      });
    });
  }
});
app.listen(3000, () => {
  console.log("listening to port 3000...");
});
