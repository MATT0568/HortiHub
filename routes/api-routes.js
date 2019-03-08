var Plant = require("../models/plant.js");
var User = require("../models/user.js");
var axios = require("axios");

module.exports = function (app) {
  app.get("/api/:plants", function (req, res) {
    if (req.params.plants) {
      Plant.findOne({
        where: {
          routeName: req.params.plants
        }
      }).then(function (result) {
        return res.json(result);
      });
    } else {
      Plant.findAll().then(function (result) {
        return res.json(result);
      });
    }
  });

  app.get("/axios/:plant", function (req, res) {
    var plant = req.params.plant;
    var url = "https://trefle.io/api/plants?q=" + plant + "&complete_data=true&token=SXRQeVlTdzZrbGYxSms1Y2dQeWZRQT09";
    axios
      .get(url)
      .then(function (response) {
        return res.json(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  });

  app.get("/api/:user", function (req, res) {
    if (req.params.user) {
      User.findOne({
        where: {
          email: req.params.user
        }
      }).then(function (result) {
        return res.json(result);
      });
    } else {
      User.findAll().then(function (result) {
        return res.json(result);
      });
    }
  });

  app.get("/validate/:info", function (req, res) {
    var info = req.params.info;
    var infoArr = info.split(",");
    sequelize
    .query('EXEC getData :@param1', { replacements: { email: infoArr[0], password: infoArr[1]}, type:sequelize.QueryTypes.SELECT })
    .then(data => /*Do something with the data*/)
    .catch(error => /*Do something with the error*/)
  });

  app.post("/api/new", function (req, res) {
    var plant = req.body;
    var routeName = plant.name.replace(/\s+/g, "").toLowerCase();

    Plant.create({
      routeName: routeName,
      name: plant.name
    });

    res.status(204).end();
  });
};

function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};
