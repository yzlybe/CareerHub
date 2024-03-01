const express = require("express");
const router = express.Router();
const mainCtr = require("../controller/Cmain");
const jobsCtr = require("../controller/Cjobs");
// const likeCtr = require("../controller/Clike");
const reviewCtr = require("../controller/Creview");

// 테스트용 gLogin.ejs 페이지 렌더링 경로
router.get("/test", mainCtr.googleTest);
// 구글 로그인 인증 서버로 리다이렉트 될 경로
router.get("/login", mainCtr.googleLogin);
// 구글 로그인 성공시 리다이렉트 될 경로
router.get("/login/redirect", mainCtr.googleLoginRedirect);
// 구글 회원가입 요청 경로
router.get("/signup", mainCtr.googleSignUp);
// // 구글 회원가입 성공시
router.get("/signup/redirect", mainCtr.googleSignUpRedirect);

module.exports = router;
