var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var App_user = sequelize.define("app_user", {
    user_id: {
        type: Sequelize.INTEGER(32),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(32),
        notNull: true
    },
    password: {
        type: Sequelize.STRING(32),
        notNull: true
    },
    first_name: {
        type: Sequelize.STRING(32),
        notNull: true
    },
    last_name: {
        type: Sequelize.STRING(32),
        notNull: true
    },
    createdAt: {
        type: Sequelize.DATE(3),
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updatedAt: {
        type: Sequelize.DATE(3),
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    }
}, {
        timestamps: true,
        freezeTableName: true
    });


App_user.sync();

module.exports = App_user;