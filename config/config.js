require("dotenv").config();

const DB = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "asia/seoul", // created_at 등 저장할때 한국시간으로 저장
    dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true, // 적용 db에서 꺼내올때 바로 스트링 처리
        typeCast: true, // 적용 이건 date -> 스트링으로 타입 변경한다는 옵션인듯
    },
};

const prod = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: "115.85.181.69",
    dialect: "mysql",
    timezone: "asia/seoul", // created_at 등 저장할때 한국시간으로 저장
    dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true, // 적용 db에서 꺼내올때 바로 스트링 처리
        typeCast: true, // 적용 이건 date -> 스트링으로 타입 변경한다는 옵션인듯
    },
};

module.exports = { DB, prod };
