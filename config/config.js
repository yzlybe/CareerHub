require("dotenv").config();

const DB = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
};

const prod = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: "115.85.181.69",
    dialect: "mysql",
};

module.exports = { DB, prod };
