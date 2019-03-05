var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    hortihub_db.findAll({}).then(function(hortihub_db) {
      res.render("index", {
        msg: "Welcome!",
        examples: hortihub_db
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    hortihub_db.findOne({ where: { id: req.params.id } }).then(function(hortihub_db) {
      res.render("example", {
        example: hortihub_db
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
