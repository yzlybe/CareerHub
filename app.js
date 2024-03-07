const express = require("express");
const session = require("express-session");
const router = require("./routes/router");
const OauthRouter = require("./routes/google");
const { sequelize } = require("./models");
const app = express();
const dotenv = require("dotenv").config();
const multer = require("multer");
const path = require("path");

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
//각 페이지 렌더링시 세션 정보 주입하는 미들웨어 by영인
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// 라우터 설정
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

//

const uploadDetail = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "uploads/");
        },

        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname, ext);
            const timestamp = Date.now();
            const newFilename = `${filename}${ext}`;
            done(null, newFilename);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

app.post("/upload", uploadDetail.single("img_path"), function (req, res) {
    console.log(req.body);
    console.log(req.file);
    res.send({ path: req.file.filename });

    res.render("result", {
        src: req.file.path,
        Info: req.body,
    });
});
