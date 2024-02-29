//model 불러오기
const {
    usersModel,
    jobsModel,
    reviewsModel,
    likesModel,
} = require("../models");
const dotenv = require("dotenv").config();

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
exports.findOneUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const foundUser = await usersModel.findOne({
            where: {
                users_email: email,
                users_password: password,
            },
        });

        console.log("조회결과", foundUser);
        // console.log(foundUsers.users_id);

        // 가입된 유저시 세션 설정
        if (foundUser) {
            req.session.userId = foundUser.users_id;
            req.session.nickname = foundUser.nickname;
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
// get /mypage
// 세션에 userId 값이 있을 때(로그인 상태) 사용자 정보 표시
// 없을시 로그인 화면으로 리다이렉트
exports.findUserProfile = async (req, res) => {
    if (!req.session.userId) return res.redirect("/");
    try {
        console.log(req.session.userId);
        const userProfile = await usersModel.findOne({
            where: {
                users_id: req.session.userId,
            },
        });
        console.log(userProfile); // DB조회된 결과 확인
        res.send(userProfile);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
// put /myapge
// 사용자 정보 수정
// 세션 만료되면 다시 로그인 필요하도록
exports.updateUser = async (req, res) => {
    if (!req.session.userId) return res.redirect("/");
    try {
        console.log(req.session.userId);
        const { password, nickname } = req.body;
        const isUpdated = await usersModel.update(
            {
                users_password: password,
                nickname: nickname,
            },
            {
                where: {
                    // users_id: 1,
                    users_id: req.session.userId,
                },
            }
        );
        console.log(isUpdated); // 수정 결과 확인
        if (isUpdated > 0) {
            // 수정 성공시
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// delete /mypage
// 사용자 정보 수정
// 세션 만료되면 다시 로그인 필요하도록
exports.deleteUser = async (req, res) => {
    // if (!req.session.userId) return res.redirect("/");
    try {
        console.log(req.session.userId);
        const isDeleted = await usersModel.destroy({
            where: {
                users_id: 1,
                // users_id: req.session.userId,
            },
        });
        console.log(isDeleted); // DB 삭제 결과 확인
        if (isDeleted > 0) {
            // 삭제 성공시 세션 삭제
            req.session.destroy((err) => {
                if (err) throw err;
            });
            res.send(true);
            //res.redirect("/");
        } else {
            res.send(false);
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
    });
    res.redirect("/");
};

// =================== oAuth ===================

exports.googleTest = (req, res) => {
    res.render("gLogin");
};

exports.googleLogin = (req, res) => {
    let url = "https://accounts.google.com/o/oauth2/v2/auth";
    // client_id는 위 스크린샷을 보면 발급 받았음을 알 수 있음
    // 단, 스크린샷에 있는 ID가 아닌 당신이 직접 발급 받은 ID를 사용해야 함.
    url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
    // 아까 등록한 redirect_uri
    // 로그인 창에서 계정을 선택하면 구글 서버가 이 redirect_uri로 redirect 시켜줌
    url += `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}`;
    // 필수 옵션.
    url += "&response_type=code";
    // 구글에 등록된 유저 정보 email, profile을 가져오겠다 명시
    url += "&scope=email profile";
    // 완성된 url로 이동
    // 이 url이 위에서 본 구글 계정을 선택하는 화면임.
    res.redirect(url);
};

exports.googleLoginDone = (req, res) => {
    const { code } = req.query;
    console.log(`code: ${code}`);
    res.send("login ok");
};
