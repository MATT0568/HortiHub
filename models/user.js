module.exports = function(sequelize, DataTypes) {
    var App_user = sequelize.define("app_user", {
        user_id: {
            type: DataTypes.INTEGER(32),
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(32),
            notNull: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING(32),
            notNull: true
        },
        first_name: {
            type: DataTypes.STRING(32),
            notNull: true
        },
        last_name: {
            type: DataTypes.STRING(32),
            notNull: true
        },
        createdAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
        },
        updatedAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
        }
    }, {
            timestamps: true,
            freezeTableName: true
        });
        
  
    App_user.associate = function(models) {
      App_user.hasMany(models.plant, {
        onDelete: "cascade"
      });
    };
  
    return App_user;
  };
  