var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/userplants", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/userplants.html"));
  });

  app.get("/plantinfo", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/plantinfo.html"));
  });
};