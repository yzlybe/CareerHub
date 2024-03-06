//model 불러오기
const {
    usersModel,
    jobsModel,
    reviewsModel,
    likesModel,
    stackModel,
} = require("../models");
const dotenv = require("dotenv").config();

// GET /me/jobs
exports.myJobs = async (req, res) => {
    try {
        console.log(req.session.userId);
        if (!req.session.userId)
            return res.send({ isLogin: false, msg: "로그인이 필요합니다." });
        // 세션에 저장된 유저아이디 값으로 유저가 작성한 공고 아이디 조회
        const jobsIdList = await likesModel.findAll({
            where: {
                users_id: req.session.userId,
            },
            attributes: ["jobs_id"],
        });
        console.log(jobsIdList); //배열
        // let myJobList = [];
        const myJobList = [];
        for (let i = 0; i < jobsIdList.length; i++) {
            myJob = await jobsModel.findOne({
                where: {
                    jobs_id: jobsIdList[i].jobs_id,
                },
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
            myJobList.push(myJob);
        }
        console.log(myJobList);
        res.send(myJobList);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
