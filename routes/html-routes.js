var path = require("path");
var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"));
  });

  app.get("/all", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/all.html"));
  });
};


function requireLogin(req, res, next) {
  if (!res.user) {
    console.log(res.user);
    res.redirect('/');
  } else {
    console.log(res.user);
    next();
  }
};