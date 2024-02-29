const express = require("express");
const router = express.Router();
const mainCtr = require("../controller/Cmain");
const jobsCtr = require("../controller/Cjobs");
// const likeCtr = require("../controller/Clike");
// const reviewCtr = require("../controller/Creview");

/* ========main routing========= */
router.get("/", mainCtr.index);
router.get("/main", mainCtr.main);
router.get("/register", mainCtr.register);
router.post("/register", mainCtr.createUser);
router.get("/login", mainCtr.login);
router.post("/login", mainCtr.findOneUsers);
router.get("/mypage", mainCtr.findUserProfile);
// router.put("/mypage", mainCtr.updateUser);
// router.delete("/mypage", mainCtr.deleteUser);

/*  ========jobs routing========= */
router.get("/jobs", jobsCtr.jobs);
router.get("/jobs/like", jobsCtr.jobsLike);
router.get("/jobs/:jobId", jobsCtr.jobsDetail);
// router.post("/jobs", jobsCtr.jobsWrite)

/*  ========like routing========= 

*/

/*  ========review routing========= 

*/

module.exports = router;
