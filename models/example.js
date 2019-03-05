module.exports = function(sequelize, DataTypes) {
  var hortihub_db = sequelize.define("hortihub_db", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return hortihub_db;
};
