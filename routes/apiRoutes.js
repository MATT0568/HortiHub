var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(hortihub_db) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    hortihub_db.create(req.body).then(function(hortihub_db) {
      res.json(hortihub_db);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    hortihub_db.destroy({ where: { id: req.params.id } }).then(function(hortihub_db) {
      res.json(hortihub_db);
    });
  });
};
