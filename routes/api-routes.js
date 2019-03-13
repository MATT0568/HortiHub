var axios = require("axios");
var sequelize = require("../config/connection.js");
var db = require("../models");

module.exports = function (app) {
  app.get("/db", function (req, res) {
    var userId;
    db.app_user.findOne({
      where: {
        email: req.cookies.userId
      }
    }).then(function (result) {
      userId = result.dataValues.user_id;
      db.plant.findAll({
        where: {
          appUserUserId: userId
        }
      }).then(function (result) {
        return res.json(result);
      });
    });
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
        console.log(newLink);
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

  app.post("/validate", function (req, res) {
    var info = req.body;
    sequelize
      .query('SELECT valid_user (:email, :password)', {
        replacements: {
          email: info.email,
          password: info.password,
        }
      })
      .then(function (result) {
        var str = JSON.stringify(result[0][0]);
        var isValid = parseInt(str[str.length - 3]);
        if (!isValid) {
          res.json(false);
        } else {
          res.cookie('userId', info.email, { maxAge: 900000, httpOnly: true });
          res.json(true);
        }
      });
  });

  app.post("/add/user", function (req, res) {
    var info = req.body;
    sequelize
      .query('CALL add_user (:email, :password, :first_name, :last_name)', {
        replacements: {
          email: info.email,
          password: info.password,
          first_name: info.first_name,
          last_name: info.last_name
        }
      });
    sequelize
      .query('SELECT valid_user (:email, :password)', {
        replacements: {
          email: info.email,
          password: info.password,
        }
      })
      .then(function (result) {
        var str = JSON.stringify(result[0][0]);
        var isValid = parseInt(str[str.length - 3]);
        if (!isValid) {
          res.json(false);
        } else {
          res.json(true);
        }
      });
  });

  app.post("/api/new", function (req, res) {
    var plant = req.body;
    var userId;
    db.app_user.findOne({
      where: {
        email: req.cookies.userId
      }
    }).then(function (result) {
      userId = result.dataValues.user_id;
      db.plant.create({
        waterTime: plant.waterTime,
        commonName: plant.common_name,
        scientificName: plant.scientific_name,
        imgURL: plant.images[0].url,
        duration: plant.duration,
        growthRate: plant.main_species.specifications.growth_rate,
        growthPeriod: plant.main_species.specifications.growth_period,
        flowerColor: plant.main_species.flower.color,
        phMin: plant.main_species.growth.ph_minimum,
        phMax: plant.main_species.growth.ph_maximum,
        shadeTolerance: plant.main_species.growth.shade_tolerance,
        droughtTolerance: plant.main_species.growth.drought_tolerance,
        bloomPeriod: plant.main_species.seed.bloom_period,
        minTemp: plant.main_species.growth.temperature_minimum.deg_f,
        commercialAvailability: plant.main_species.seed.commercial_availability,
        appUserUserId: userId
      });
    });

    res.status(204).end();
  });

  app.get('/logout', function (req, res) {
    res.redirect('/');
  });
};
