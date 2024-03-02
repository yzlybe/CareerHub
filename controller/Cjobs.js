//model 불러오기
const {
    usersModel,
    jobsModel,
    reviewsModel,
    likesModel,} = require("../models");

exports.index = (req,res) => {
    res.render("index");
};

// GET /jobs
// 전체 공고 목록 조회
exports.jobs = async (req, res) => {
    const listJobs = await jobsModel.findAll();
    res.send(listJobs);
    console.log("전체 공고 목록_listJobs")
    
};

// GET /jobs /like
// 사용자가 관심 등록한 공고 목록 조회(메뉴바에서 관심 목록 클릭시)
exports.jobsLike = async (req, res) => {
    try{
        //const userId = req.session.users_id;
        const userId = req.query.userId;
        const userLikes = await likesModel.findAll({
            where: 
            { 
                users_id: userId,
            },            
        });
        console.log("userId 작성한 값",userId);
        console.log(userLikes);

        const likedJobs = [];
        for (const like of userLikes) {
            const job = await jobsModel.findOne({
                where: {
                    jobs_id: like.jobs_id,
                },
            });
            likedJobs.push(job);

        }
        console.log("likedJobs안에 담긴 배열 데이터",likedJobs);
        res.send(likedJobs);
        
    }catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// GET /jobs /:jobsId
// 공고 상세 페이지 조회
exports.jobsDetail = async (req, res) => {
    try{
        console.log(req.body);
        const jobId = req.params.jobId;
        const jobsDetail = await jobsModel.findOne({
            where: {jobs_id: jobId},
        });
        res.send(jobsDetail);
        console.log("공고 상세 페이지 완료")

    }catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
}; 

// POST /jobs
// 공고 등록
exports.jobsWrite = async (req, res) => {
    try{
        console.log(req.body);
        const { 
            usersId, companyName, leVels, inTroduce, tAsk, 
            condiTions, preFer, staCk, deadLine, addRess, sourCe
        } = req.body;


        const isSuccess = await jobsModel.create({
            users_id: usersId,
            company_name: companyName,
            levels: leVels,
            introduce: inTroduce,
            task: tAsk,
            conditions: condiTions,
            prefer: preFer,
            stack: staCk,
            deadline: deadLine,
            address: addRess,
            source: sourCe,
        });
        console.log(isSuccess);

        if(isSuccess) {
            res.send(true);
        }else {
            res.send(false);
        }
    }catch(error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// PUT /jobs
// 공고 수정
exports.jobsUpdate = async (req, res) => {
    try{
        console.log(req.body);
        const { 
            usersId, companyName, leVels, inTroduce, tAsk, 
            condiTions, preFer, staCk, deadLine, addRess, sourCe
        } = req.body;

        const isSuccess = await jobsModel.update({
            company_name: companyName,
            levels: leVels,
            introduce: inTroduce,
            task: tAsk,
            conditions: condiTions,
            prefer: preFer,
            stack: staCk,
            deadline: deadLine,
            address: addRess,
            source: sourCe,
        },
        {
            where: {
                users_id: usersId,
            },
        }
        );
        console.log(isSuccess);
        if (isSuccess) {
            res.send(true);
        } else {
            res.send(false);
        }
    }catch(error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// DELETE /jobs
// 공고 삭제
exports.jobsDelete = async (req, res) => {
    try{
        console.log(req.body);
        const { 
            usersId, companyName, leVels, inTroduce, tAsk, 
            condiTions, preFer, staCk, deadLine, addRess, sourCe
        } = req.body;

        const isSuccess = await jobsModel.destroy({
            users_id: usersId,
            levels: leVels,
            introduce: inTroduce,
            task: tAsk,
            conditions: condiTions,
            prefer: preFer,
            stack: staCk,
            deadline: deadLine,
            address: addRess,
            source: sourCe,
            where: {
                company_name: companyName,
            },
        });
        console.log(isSuccess);
        if (isSuccess) {
            res.send(true);
        } else {
            res.send(false);
        }
    }catch(error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};


// GET /jobs/:company
// 회사명으로 검색
// 아직 수정중... 여기서부터 
exports.jobsCom = async (req, res) => {
    try{
        console.log(req.body);
        //const companyName = req.params.companyName;
        const companyName = req.session.companyName;
        const jobsCom = await jobsModel.findOne({
            where: {company_name: companyName},
        });
        res.send(jobsCom);
        console.log("회사명 검색 완료")

    }catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

