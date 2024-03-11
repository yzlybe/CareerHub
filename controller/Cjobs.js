//model 불러오기
const {
    usersModel,
    jobsModel,
    reviewsModel,
    likesModel,
    stackModel,
} = require("../models");

exports.index = (req, res) => {
    res.render("index");
};

// GET /jobs
// 공고 작성 페이지
exports.jobs = async (req, res) => {
    const writeJobs = await jobsModel.findAll();
    console.log("listjobs", writeJobs);
    res.render("detail.ejs", {
        data: writeJobs,
        KAKAO_MAP_API_KEY: process.env.KAKAO_MAP_API_KEY,
    });
    console.log("공고 작성 페이지_writeJobs");
};

// GET /jobs /like
// 사용자가 관심 등록한 공고 목록 조회(메뉴바에서 관심 목록 클릭시)
exports.jobsLike = async (req, res) => {
    try {
        const userId = req.session.userId;
        const userLikes = await likesModel.findAll({
            where: {
                users_id: userId,
            },
        });
        console.log("userId 작성한 값", userId);
        console.log(userLikes);

        const likedJobs = [];
        for (const like of userLikes) {
            const job = await jobsModel.findOne({
                where: {
                    jobs_id: like.jobs_id,
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
                order: [["created_at", "DESC"]],
            });
            likedJobs.push(job);
        }
        console.log("likedJobs안에 담긴 배열 데이터", likedJobs);
        res.send(likedJobs);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// GET /jobs /:jobsId
// 공고 상세 페이지 조회
exports.jobsDetail = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const jobsDetail = await jobsModel.findOne({
            where: { jobs_id: jobId },
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
        const reviews = await reviewsModel.findAll({
            where: { jobs_id: jobId },
        });
        console.log("reviews list", reviews);
        res.render("post.ejs", {
            data: jobsDetail,
            reviewsdata: reviews,
        });
        console.log("공고 상세 페이지 완료");
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// POST /jobs
// 공고 등록
exports.jobsWrite = async (req, res) => {
    try {
        const userId = req.session.userId;
        const {
            imgPath,
            companyName,
            levels,
            introduce,
            task,
            conditions,
            prefer,
            welfare,
            deadline,
            address,
            address_detail,
            others,
            source,
            stack,
        } = req.body;

        let levelValue;
        switch (levels) {
            case "신입":
                levelValue = 1;
                break;
            case "경력":
                levelValue = 2;
                break;
            case "무관":
                levelValue = 3;
                break;
            default:
                throw new Error("올바르지 않은 경력 레벨입니다."); // 예상치 못한 값이 전달된 경우 오류 발생
        }
        // stackModel에 있는 컬럼명 배열
        const stackColumns = [
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
        ];
        // stackModel에 삽입할 데이터 객체 초기화
        const stackModelData = {};
        // 스택 컬럼명에 대해 순회하면서 해당 값이 스택 데이터에 포함되어 있는지 확인하여 true 또는 false 설정
        stackColumns.forEach((column) => {
            // 대소문자를 구별하지 않고 비교하기 위해 모든 스택 값을 소문자로 변환하여 비교
            const stackValue = stack.map((value) => value.toLowerCase());
            stackModelData[column] = stackValue.includes(column.toLowerCase());
        });

        const job = await jobsModel.findOne({
            where: { company_name: companyName },
        });
        // 회사명 unique로 설정해서 중복체크
        if (job)
            return res
                .status(404)
                .send({ result: false, msg: "회사 이름 중복" });

        const isSuccess = await jobsModel.create({
            users_id: userId,
            img_path: imgPath,
            company_name: companyName,
            levels: levelValue,
            introduce: introduce,
            task: task,
            conditions: conditions,
            prefer: prefer,
            welfare: welfare,
            deadline: deadline,
            address: address,
            address_detail: address_detail,
            others: others,
            source: source,
        });
        const createdStack = await stackModel.create({
            ...stackModelData,
            jobs_id: isSuccess.jobs_id,
        });
        console.log("삽입결과", createdStack);
        console.log("isSuccess: ", isSuccess);
        if (isSuccess)
            return res.send({
                result: true,
                msg: "공고 등록 성공",
                jobsId: isSuccess.jobs_id,
            });
        else
            return res
                .status(404)
                .send({ result: false, msg: "공고 등록 실패" });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// PATCH /jobs
// 공고 수정
exports.jobsUpdate = async (req, res) => {
    try {
        console.log(req.body);
        const {
            jobsId,
            usersId,
            //updated_at,
            img_path,
            companyName,
            levels,
            introduce,
            task,
            conditions,
            prefer,
            welfare,
            deadline,
            address,
            address_detail,
            others,
            source,
            stack,
        } = req.body;

        let levelValue;
        console.log(levels);
        switch (levels) {
            case "신입":
                levelValue = 1;
                break;
            case "경력":
                levelValue = 2;
                break;
            case "무관":
                levelValue = 3;
                break;
            default:
                throw new Error("올바르지 않은 경력 레벨입니다."); // 예상치 못한 값이 전달된 경우 오류 발생
        }
        console.log("levelValue:", levelValue);

        // 스택 관련 컬럼 목록
        const stackColumns = [
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
        ];
        // 스택 테이블 업데이트
        const stackModelData = {}; // 스택 데이터 객체 초기화

        // 스택 데이터 객체 업데이트
        stackColumns.forEach((column) => {
            stackModelData[column] = stack.includes(column);
        });

        const isSuccess = await jobsModel.update(
            {
                users_id: usersId,
                img_path,
                company_name: companyName,
                levels: levelValue,
                introduce,
                task,
                conditions,
                prefer,
                welfare,
                deadline,
                address,
                address_detail,
                source,
                others,
            },
            {
                where: {
                    jobs_id: jobsId,
                },
            }
        );

        // 스택 테이블 업데이트
        const updatedStack = await stackModel.update(stackModelData, {
            ...stackModelData,
            where: {
                jobs_id: jobsId,
            },
        });
        /*
        const createdStack = await stackModel.create({
            ...stackModelData,
            jobs_id: job.jobs_id,
        });
*/
        console.log("Updated stack:", updatedStack);

        console.log(usersId);
        console.log(isSuccess);
        if (isSuccess > 0 && updatedStack > 0) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// DELETE /jobs
// 공고 삭제
exports.jobsDelete = async (req, res) => {
    try {
        console.log("body", req.body);
        const isDeleted = await jobsModel.destroy({
            where: {
                jobs_id: req.body.jobsId,
            },
        });
        console.log(isDeleted);
        if (isDeleted > 0) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
