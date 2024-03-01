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
        const userId = req.session.users_id;
        const userLikes = await likesModel.findAll({
            where: 
            { 
                users_id: userId,
            },            
        });

        console.log(userLikes);

        const likedJobs = [];
        for (const like of userLikes) {
            const job = await jobsModel.findOne({
                where: {
                    job_id: like.jobs_id,
                },
            });
            likedJobs.push(job);

        }
        console.log(likedJobs);
        res.send();
        
    }catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
//배열 순회 메서드, for문, 구조분해할당
//userLikes[0].jobs_id 
//userLikes[1].jobs_id




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
        console.log("rhdrh tkd")

    }catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
}; 

// POST /jobs
// 공고 등록
// exports.jobsWrite = async (req, res) => {

// };

