const express = require("express");
const session = require("express-session");
const router = require("./routes/router");
const OauthRouter = require("./routes/google");
const { sequelize } = require("./models");
const app = express();
const dotenv = require("dotenv").config();

/* 미들웨어 설정 */
app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* 세션 설정 */
const sessionConfig = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60,
        signed: true,
    },
};
app.use(session(sessionConfig));

/* 라우터 설정 */
app.use("/", router);
app.use("/google", OauthRouter);

/* 시퀄라이즈 설정 */
sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Database connection succeeded!");
            console.log(`http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
