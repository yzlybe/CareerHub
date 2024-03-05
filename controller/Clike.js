//model 불러오기
const {
    usersModel,
    jobsModel,
    reviewsModel,
    likesModel,
} = require("../models");
const dotenv = require("dotenv").config();
const axios = require("axios");

exports.increCount = async (req, res) => {
    console.log(req.body);
    try {
        const { jobsId } = req.body;
        // 해당 공고 좋아요 수 검색
        const count = await jobsModel.findOne({
            where: {
                jobs_id: jobsId,
            },
        });
        // 좋아요 수 타입 확인
        console.log(typeof count.cnt_likes);
        const changedCount = count.cnt_likes + 1; // count++
        const isSuccess = await jobsModel.update(
            {
                cnt_likes: changedCount,
            },
            {
                where: {
                    jobs_id: jobsId,
                },
            }
        );
        if (isSuccess) {
            res.send({ result: true, data: changedCount });
        } else {
            res.send({ result: false, msg: "좋아요 증가 실패" });
        }
        // todo:
        // 유저가 어떤 공고를 관심등록 했는지 user_likes 테이블에 추가하는 로직
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

exports.reduceCount = async (req, res) => {
    console.log(req.body);
    try {
        const { jobsId } = req.body;
        // 해당 공고 좋아요 수 검색
        const count = await jobsModel.findOne({
            where: {
                jobs_id: jobsId,
            },
        });
        const changedCount = count.cnt_likes - 1; // count++
        console.log(changedCount);
        if (changedCount !== -1) {
            const isSuccess = await jobsModel.update(
                {
                    cnt_likes: changedCount,
                },
                {
                    where: {
                        jobs_id: jobsId,
                    },
                }
            );
            res.send({ result: true, data: changedCount });
        } else {
            res.send({ result: false, msg: "좋아요 감소 실패" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
