var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var Plant = sequelize.define("plant", {
 routeName: Sequelize.STRING,
 commonName: Sequelize.STRING,
 scientificName: Sequelize.STRING,
 type: Sequelize.STRING,
 duration: Sequelize.STRING,
 growthRate: Sequelize.STRING,
 growthPeriod: Sequelize.STRING,
 lifespan: Sequelize.STRING,
 seedBegin: Sequelize.STRING,
 seedEnd: Sequelize.STRING,
 flowerColor: Sequelize.STRING,
 phMin: Sequelize.DECIMAL(10, 1),
 phMax: Sequelize.DECIMAL(10, 1),
 droughtTolerance: Sequelize.STRING,
 bloomPeriod: Sequelize.STRING,
 commercialAvailability: Sequelize.STRING
}, {
 freezeTableName: true
});


Plant.sync();

module.exports = Plant;