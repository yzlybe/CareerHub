//model 불러오기
const {
    usersModel,
    jobsModel,
    reviewsModel,
    likesModel,
} = require("../models");

// get /review/:jobsId
// 댓글 조회
exports.findAllReviews = async (req, res) => {
    try {
        console.log(req.params);
        const { jobsId } = req.params;
        const foundJobsId = await jobsModel.findOne({
            where: {
                jobs_id: jobsId,
            },
        });
        //파라미터 유효성 검증
        if (!foundJobsId)
            return res
                .status(404)
                .send({ result: false, msg: "존재하지 않는 공고입니다." });

        const reviews = await reviewsModel.findAll({
            where: { jobs_id: jobsId },
        });
        console.log(reviews);
        if (reviews.length > 0) {
            res.send({
                result: true,
                data: reviews,
            });
        } else {
            res.send({
                result: false,
                msg: "댓글이 없습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// post /review
// 댓글 등록
exports.createReview = async (req, res) => {
    if (!req.session.userId)
        return res
            .status(404)
            .send({ result: false, msg: "로그인이 필요합니다" });
    try {
        const { jobsId, comment } = req.body;
        // 리뷰 테이블 삽입시 필요한 컬럼 users_id,jobs_id,reviews_comment
        const isSuccess = await reviewsModel.create({
            reviews_comment: comment,
            jobs_id: jobsId,
            users_id: req.session.userId,
            nickname: req.session.nickname,
        });
        console.log("issuccess", isSuccess);
        if (isSuccess) {
            res.send({ result: true, msg: "댓글 등록 성공" });
        } else {
            res.send({ result: false, msg: "댓글 등록 실패" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// patch /review
// 댓글 수정
exports.updateReview = async (req, res) => {
    if (!req.session.userId)
        return res
            .status(404)
            .send({ result: false, msg: "로그인이 필요합니다" });
    try {
        console.log(req.body);
        const { reviewId, comment, jobsId } = req.body;
        // 작성자만 수정 할 수 있는 로직
        // 프론트에 저장된 닉네임과 디비 값 비교후 작성자일 경우 auth값 보내기
        const authUserId = await reviewsModel.findAll({
            where: {
                users_id: req.session.userId,
                reviews_id: reviewId,
                jobs_id: jobsId,
            },
        });
        console.log(authUserId.length);
        if (authUserId.length === 0)
            return res
                .status(404)
                .send({ auth: false, msg: "권한이 없습니다." }); // 로그인 했지만 본인이 작성한 리뷰가 아닐경우
        // 권한이 있을 경우
        const isSuccess = await reviewsModel.update(
            {
                reviews_comment: comment,
            },
            {
                where: {
                    reviews_id: reviewId,
                },
            }
        );
        if (isSuccess > 0) {
            res.send({ result: true, msg: "댓글 수정 성공", auth: true });
        } else {
            res.send({ result: false, msg: "댓글 수정 내용없음", auth: true });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// delete /review
// 댓글 삭제
exports.deleteReview = async (req, res) => {
    if (!req.session.userId)
        return res
            .status(404)
            .send({ result: false, msg: "로그인이 필요합니다" });
    try {
        console.log(req.body);
        const { reviewId } = req.body;
        const isSuccess = await reviewsModel.destroy({
            where: {
                reviews_id: reviewId,
            },
        });

        console.log(isSuccess);
        if (isSuccess) {
            res.send({ result: true, data: null, msg: "댓글 삭제 성공" });
        } else {
            res.send({ result: false, data: null, msg: "댓글 삭제 실패" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
