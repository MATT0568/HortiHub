var Plant = require("../models/plant.js");
var User = require("../models/user.js");
var axios = require("axios");
var sequelize = require("../config/connection.js");

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

  app.get("/plant/:plant", function (req, res) {
    var plant = req.params.plant;
    var url = "https://trefle.io/api/plants?q=" + plant + "&complete_data=true&token=SXRQeVlTdzZrbGYxSms1Y2dQeWZRQT09";
    axios
      .get(url)
      .then(function (response) {
        var link = response.data[0].link;
        console.log(link);
        var newLink = link + "?token=SXRQeVlTdzZrbGYxSms1Y2dQeWZRQT09";
        axios
          .get(newLink)
          .then(function (response) {
            res.json(response.data);
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

  app.get("/plants/:plant", function (req, res) {
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

  app.post("/validate/:info", function (req, res) {
    var info = req.params.info;
    var infoArr = info.split(",");
    sequelize
      .query('SELECT valid_user (:email, :password)', {
        replacements: {
          email: infoArr[0],
          password: infoArr[1],
        }
      })
      .then(function (result) {
        var str = JSON.stringify(result[0][0]);
        var isValid = str[str.length - 3]
        if (!isValid) {
          //res.render('/', { error: 'Invalid email or password.' });
        } else {
          req.session.user = infoArr[0];
          res.json(true);
        }
      });
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

  app.get('/logout', function(req, res) {
    req.session.reset();
    res.redirect('/');
  });
};

function requireLogin(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};
