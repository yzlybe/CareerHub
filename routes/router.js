const express = require("express");
const router = express.Router();
const mainCtr = require("../controller/Cmain");
const jobsCtr = require("../controller/Cjobs");
// const likeCtr = require("../controller/Clike");
const reviewCtr = require("../controller/Creview");

/* ========main routing========= */
router.get("/", mainCtr.index);
router.get("/main", mainCtr.main);
router.get("/register", mainCtr.register);
router.post("/register", mainCtr.createUser);
router.get("/login", mainCtr.login);
router.post("/login", mainCtr.findOneUser);
router.get("/mypage", mainCtr.findUserProfile);
router.put("/mypage", mainCtr.updateUser);
router.delete("/mypage", mainCtr.deleteUser);
router.get("/logout", mainCtr.logout);

/*  ========jobs routing========= */
router.get("/jobs", jobsCtr.jobs);
router.get("/jobs/like", jobsCtr.jobsLike);
router.get("/jobs/:jobId", jobsCtr.jobsDetail);
router.post("/jobs", jobsCtr.jobsWrite);
router.put("/jobs", jobsCtr.jobsUpdate);
router.delete("/jobs", jobsCtr.jobsDelete);
/*  ========like routing========= 

*/
router.get("/review/:jobsId", reviewCtr.findAllReviews);
router.post("/review", reviewCtr.createReview);
router.put("/review", reviewCtr.updateReview);
router.delete("/review", reviewCtr.deleteReview);

/*  ========review routing========= 

*/

module.exports = router;
