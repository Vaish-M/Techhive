const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/addemployee", function (req, res) {
  let empid = req.body.empid;
  let name = req.body.name;
  let dept = req.body.dept;
  let salary = req.body.salary;
  let designation = req.body.designation;
  let mobile = req.body.mobile;

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://127.0.0.1:27017/";

  MongoClient.connect(url)
    .then(function (db) {
      var dbo = db.db("emp");
      var myobj = {
        empid: empid,
        name: name,
        dept: dept,
        salary: salary,
        designation: designation,
        mobile: mobile,
      };

      console.log("test " + myobj.empid);
      dbo
        .collection("employee")
        .insertOne(myobj)
        .then(function () {
          console.log("Record Inserted..");
          res.send("Insert Success..");
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
});
app.post("/updateemployee", function (req, res) {
  let empid = req.body.empid;
  let name = req.body.name;
  let dept = req.body.dept;
  let salary = req.body.salary;
  let designation = req.body.designation;
  let mobile = req.body.mobile;

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://127.0.0.1:27017/";
  MongoClient.connect(url)
    .then(function (db) {
      var dbo = db.db("emp");
      var myquery = { empid: empid };
      var newvalues = {
        $set: {
          empid: empid,
          name: name,
          dept: dept,
          salary: salary,
          designation: designation,
          mobile: mobile,
        },
      };

      console.log("test " + myquery.empid);
      dbo
        .collection("employee")
        .updateOne(myquery, newvalues)
        .then(function () {
          console.log("Record Updated..");
          res.send("Update Success..");
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
});
app.post("/selectemployee", function (req, res) {
  let empid = req.body.empid;

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://127.0.0.1:27017/";
  MongoClient.connect(url)
    .then(function (db) {
      var dbo = db.db("emp");
      var query = { empid: empid };
      dbo
        .collection("employee")
        .find(query)
        .toArray()
        .then(function (result) {
          console.log("Fetching emlployee");
          res.send(result);
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/deleteemployee", function (req, res) {
  let empid = req.body.empid;

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://127.0.0.1:27017/";
  MongoClient.connect(url)
    .then(function (db) {
      var dbo = db.db("emp");
      var query = { empid: empid };
      dbo
        .collection("employee")
        .deleteOne(query)
        .then(function (result) {
          console.log("Record Deleted..");
          res.send("Record Deleted success..");
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(5000, function () {
  console.log("Server is running on port number 5000");
});
