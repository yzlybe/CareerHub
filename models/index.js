"use strict";

const Sequelize = require("sequelize");
// const config = require(__dirname + "/../config/config.js")["DB"];
const config = require(__dirname + "/../config/config.js")["prod"];

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
// 테이블 모듈 불러오기
const usersModel = require("./Users")(sequelize, Sequelize);
const reviewsModel = require("./Reviews")(sequelize, Sequelize);
const jobsModel = require("./Jobs")(sequelize, Sequelize);
const likesModel = require("./Likes")(sequelize, Sequelize);

//테이블 관계 설정
//회원 -- 공고
//1:N
usersModel.hasMany(jobsModel, {
    foreignKey: {
        name: "users_id",
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "set null",
    },
});
jobsModel.belongsTo(usersModel, {
    foreignKey: {
        name: "users_id",
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "set null",
    },
});

//회원 -- 좋아요
//1:N
usersModel.hasMany(likesModel, {
    foreignKey: {
        name: "users_id",
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
    },
});
likesModel.belongsTo(usersModel, {
    foreignKey: {
        name: "users_id",
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
    },
});
//공고 -- 좋아요
//1:N
jobsModel.hasMany(likesModel, {
    foreignKey: {
        name: "jobs_id",
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
    },
});
likesModel.belongsTo(jobsModel, {
    foreignKey: {
        name: "jobs_id",
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
    },
});

//회원 -- 리뷰
//1:N
usersModel.hasMany(reviewsModel, {
    foreignKey: {
        name: "users_id",
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "set null",
    },
});
reviewsModel.belongsTo(usersModel, {
    foreignKey: {
        name: "users_id",
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "set null",
    },
});

//공고 -- 리뷰
//1:N
jobsModel.hasMany(reviewsModel, {
    foreignKey: {
        name: "jobs_id",
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
    },
});
reviewsModel.belongsTo(jobsModel, {
    foreignKey: {
        name: "jobs_id",
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
    },
});

// db 객체 저장
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.usersModel = usersModel;
db.reviewsModel = reviewsModel;
db.jobsModel = jobsModel;
db.likesModel = likesModel;

module.exports = db;
