//model 불러오기
const {
    usersModel,
    jobsModel,
    reviewsModel,
    likesModel,
} = require("../models");

exports.index = (req, res) => {
    res.render("index");
};
// get /main
// 메인페이지 렌더링
exports.main = async (req, res) => {
    const foundJobs = await jobsModel.findAll();
    res.send(foundJobs);
};
// get /login
// 회원가입페이지 렌더링
exports.register = (req, res) => {
    res.send("register page");
};
// post /register
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
        //todo:
        //이메일 중복체크 검사
        //비밀번호 암호화
        //
        res.send(newUser);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
// get /login
// 로그인 페이지 렌더링
exports.login = (req, res) => {
    res.send("login page");
};
// post /login
// 로그인 요청시 DB 조회
exports.findOneUsers = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const foundUser = await usersModel.findOne({
            where: {
                users_email: email,
                users_password: password,
            },
        });

        console.log(foundUsers);
        console.log(foundUsers.users_id);
        // 가입된 유저시 세션 설정
        if (foundUsers) {
            req.session.userId = foundUsers.users_id;
            res.send(true); // 로그인 성공
        } else {
            // 로그인 실패
            res.send(false);
        }
        //todo:
        //이메일 중복체크 검사
        //비밀번호 암호화
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
