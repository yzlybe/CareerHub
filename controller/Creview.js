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
    // if (!req.session.userId) return res.redirect("/");
    try {
        console.log(req.params);
        const { jobsId } = req.params;
        const reviews = await reviewsModel.findAll({
            where: { jobs_id: jobsId },
        });
        console.log(reviews);
        res.send(reviews);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// post /review
// 댓글 등록
exports.createReview = async (req, res) => {
    // if (!req.session.userId) return res.redirect("/");
    try {
        console.log(req.body);
        const { jobsId, comment } = req.body;
        // 리뷰 테이블 삽입시 필요한 컬럼 users_id,jobs_id,reviews_comment
        const isSuccess = await reviewsModel.create({
            reviews_comment: comment,
            jobs_id: jobsId,
            // users_id: req.session.userId,
            users_id: 2,
        });
        console.log(isSuccess);
        if (isSuccess) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// put /review
// 댓글 수정
exports.updateReview = async (req, res) => {
    // if (!req.session.userId) return res.redirect("/");
    try {
        console.log(req.body);
        const { reviewId, comment } = req.body;
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

        console.log(isSuccess);
        if (isSuccess) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// delete /review
// 댓글 삭제
exports.deleteReview = async (req, res) => {
    // if (!req.session.userId) return res.redirect("/");
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
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
