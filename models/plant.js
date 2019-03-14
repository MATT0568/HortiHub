module.exports = function(sequelize, DataTypes) {
    var Plant = sequelize.define("PLANT", {
        waterTime: {
         type: DataTypes.STRING(20),
         notNull: true
        },
        commonName: DataTypes.STRING,
        scientificName: DataTypes.STRING,
        imgURL: DataTypes.STRING,
        duration: DataTypes.STRING,
        growthRate: DataTypes.STRING,
        growthPeriod: DataTypes.STRING,
        flowerColor: DataTypes.STRING,
        phMin: DataTypes.DECIMAL(10, 1),
        phMax: DataTypes.DECIMAL(10, 1),
        shadeTolerance: DataTypes.STRING,
        droughtTolerance: DataTypes.STRING,
        bloomPeriod: DataTypes.STRING,
        minTemp: DataTypes.INTEGER,
        commercialAvailability: DataTypes.STRING
    }, {
            freezeTableName: true
        });
  
    Plant.associate = function(models) {
      Plant.belongsTo(models.APP_USER, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Plant;
  };
  