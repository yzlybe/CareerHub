//model 불러오기
const {
    usersModel,
    jobsModel,
    reviewsModel,
    likesModel,
    stackModel,
} = require("../models");
const dotenv = require("dotenv").config();
const axios = require("axios");

exports.index = async (req, res) => {
    if (req.session.userId) {
        res.render("index", {
            isLogin: true,
            nickname: req.session.nickname,
            userId: req.session.userId,
        });
    } else {
        res.render("index", { isLogin: false });
    }
};
// 테스트용
exports.test = (req, res) => {
    if (req.session.userId) {
        res.render("getDB", {
            isLogin: true,
            nickname: req.session.nickname,
            userId: req.session.userId,
        });
    } else {
        res.render("getDB", { isLogin: false });
    }
};

// get /main
// 전체 공고 목록 조회

exports.main = async (req, res) => {
    const foundJobs = await jobsModel.findAll({
        include: [
            {
                model: stackModel,
                attributes: [
                    "react",
                    "vue",
                    "css",
                    "angular",
                    "javascript",
                    "html",
                    "typescript",
                    "sass",
                    "jsx",
                    "webpack",
                ],
            },
        ],
    });
    res.send(foundJobs);
};

// get /login
// 회원가입페이지 렌더링
exports.register = (req, res) => {
    res.send("register page");
};

// post /register
// 회원가입 포스트 요청
// 회원가입 페이지에서 가입하기 버튼 클릭시
exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password, nickname } = req.body;
        // 이메일 중복 체크 검사
        const checkDup = await usersModel.findOne({
            where: {
                users_email: email,
            },
        });
        if (checkDup) return res.send({ result: false, msg: "이메일 중복" });
        // 유저정보 디비 삽입
        const newUser = await usersModel.create({
            users_email: email,
            users_password: password,
            nickname: nickname,
        });
        //todo:
        //비밀번호 암호화

        if (newUser) {
            // 디비 삽입 성공시 세션 설정
            req.session.userId = newUser.users_id;
            req.session.nickname = newUser.nickname;
            res.send({ result: true, msg: "회원가입 성공" }); // 회원 가입 성공
        } else {
            // 회원 가입 실패
            res.send({ result: false, msg: "회원가입 실패" });
        }
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
// 회원가입 창에서 로그인 버튼 눌렀을때
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

        // 가입된 유저시 세션 설정
        if (foundUser) {
            req.session.userId = foundUser.users_id;
            req.session.nickname = foundUser.nickname;
            res.send({ result: true, msg: "로그인 성공" }); // 로그인 성공
        } else {
            // 로그인 실패
            res.send({ result: false, msg: "로그인 실패" });
        }
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
    // 세션값이 만료시 리다이렉트
    // if (!req.session.userId) return res.redirect("/");
    try {
        console.log(req.session.userId);
        //세션값으로 유저 프로필 조회
        const userProfile = await usersModel.findOne({
            where: {
                users_id: req.session.userId,
            },
        });
        console.log(userProfile); // DB조회된 결과 확인
        if (userProfile) {
            res.send({
                result: true,
                data: userProfile,
                msg: "프로필 조회 완료",
            });
        } else {
            res.send({ result: false, data: null, msg: "프로필 조회 실패" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
// patch /myapge
// 사용자 정보 수정
// 세션 만료되면 다시 로그인 필요하도록
exports.updateUser = async (req, res) => {
    // if (!req.session.userId) return res.redirect("/");
    try {
        console.log(req.session.userId);
        const { password, nickname } = req.body;
        console.log(req.body);
        const isUpdated = await usersModel.update(
            {
                users_password: password,
                nickname: nickname,
            },
            {
                where: {
                    // users_id: userId
                    users_id: req.session.userId,
                },
            }
        );
        console.log(isUpdated); // 수정 결과 확인
        if (isUpdated > 0) {
            // 수정 성공시
            res.send({ result: true, msg: "수정 완료" });
        } else {
            res.send({ result: false, msg: "수정된 정보 없음" });
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
                // users_id: 2,
                users_id: req.session.userId,
            },
        });
        console.log(isDeleted); // DB 삭제 결과 확인
        if (isDeleted > 0) {
            // 삭제 성공시 세션 삭제
            req.session.destroy((err) => {
                if (err) throw err;
            });
            res.send({ result: true, msg: "회원 탈퇴 완료" });
            //res.redirect("/");
        } else {
            res.send({ result: false, msg: "회원 탈퇴 실패" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
// get /logout
exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
    });
    res.end();
};

// =================== oAuth ===================
// get /goole/test
// 구글 로그인 테스트 페이지
exports.googleTest = (req, res) => {
    res.render("gLogin");
};
// get /google/login
// 프론트에서 링크걸 경로 href="/google/login"
// 구글 로그인 경로
exports.googleLogin = (req, res) => {
    let url = "https://accounts.google.com/o/oauth2/v2/auth";
    url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
    url += `&redirect_uri=${process.env.GOOGLE_LOGIN_REDIRECT_URI}`;
    url += "&response_type=code";
    url += "&scope=email profile";
    console.log(process.env.GOOGLE_CLIENT_ID);
    console.log(process.env.GOOGLE_LOGIN_REDIRECT_URI);
    res.redirect(url);
};
// get /google/login
// 구글 로그인 후 디비에 등록된 사용자인지 검증
exports.googleLoginRedirect = async (req, res) => {
    const { code } = req.query;
    console.log(`code: ${code}`);
    const resp = await axios.post(process.env.GOOGLE_TOKEN_URL, {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_LOGIN_REDIRECT_URI,
        grant_type: "authorization_code",
    });

    const resp2 = await axios.get(process.env.GOOGLE_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${resp.data.access_token}`,
        },
    });
    // res.json(resp2.data); 결과 표시
    // 받아온 정보로 디비 조회
    try {
        const { email } = resp2.data; // 구글 서버에서 온 정보로 교체

        const foundUser = await usersModel.findOne({
            where: {
                users_email: email,
            },
        });

        console.log("조회결과", foundUser);
        // console.log(foundUsers.users_id);

        // 가입된 유저시 세션 설정
        if (foundUser) {
            req.session.userId = foundUser.users_id;
            req.session.nickname = foundUser.nickname;
            res.send({ result: true, msg: "로그인 성공" }); // 로그인 성공
        } else {
            // 로그인 실패
            res.send({ result: false, msg: "로그인 실패" });
        }
        //todo:

        //비밀번호 암호화
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
// get /google/signup
// 구글 회원가입 경로
exports.googleSignUp = (req, res) => {
    let url = "https://accounts.google.com/o/oauth2/v2/auth";
    url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
    url += `&redirect_uri=${process.env.GOOGLE_SIGNUP_REDIRECT_URI}`;
    url += "&response_type=code";
    url += "&scope=email profile";
    res.redirect(url);
};
// post /google/signup
//
exports.googleSignUpRedirect = async (req, res) => {
    const { code } = req.query;
    console.log(`code: ${code}`);

    const resp = await axios.post(process.env.GOOGLE_TOKEN_URL, {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_SIGNUP_REDIRECT_URI,
        grant_type: "authorization_code",
    });

    const resp2 = await axios.get(process.env.GOOGLE_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${resp.data.access_token}`,
        },
    });
    // res.json(resp2.data);
    try {
        const { email, name } = resp2.data;
        //이메일 중복체크 검사
        const checkDup = await usersModel.findOne({
            where: {
                users_email: email,
            },
        });
        if (checkDup) return res.send({ result: false, msg: "이메일 중복" });
        //검증 후 데이터 생성
        const newUser = await usersModel.create({
            users_email: email,
            users_password: "google login User",
            nickname: name,
        });

        console.log(newUser);
        if (newUser) {
            // 디비 삽입 성공시 세션 설정
            req.session.userId = newUser.users_id;
            req.session.nickname = newUser.nickname;
            res.send({ result: true, msg: "회원가입 성공" }); // 회원 가입 성공
        } else {
            // 회원 가입 실패
            res.send({ result: false, msg: "회원가입 실패" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
