const {
    usersModel,
    jobsModel,
    reviewsModel,
    likesModel,
} = require("../models");
// 메인페이지 렌더링
exports.main = (req, res) => {
    res.send("main page");
};
// 회원가입페이지 렌더링
exports.register = (req, res) => {
    res.send("register page");
};
// 회원가입 포스트 요청
exports.createUser = async (req, res) => {
    try {
        console.log(req.body);

        const { email, password, nickname } = req.body;
        console.log(nickname);

        const newUser = await usersModel.create({
            users_email: email,
            users_password: password,
            nickname: nickname,
        });
        console.log(newUser);
        res.send(newUser);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
