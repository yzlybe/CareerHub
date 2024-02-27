"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.js")["DB"];

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.ReviewModel = require("./Reviews")(sequelize, Sequelize);
module.exports = db;
