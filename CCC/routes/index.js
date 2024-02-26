const express = require('express');
const router = express.Router();

// 메인 페이지 라우트
router.get('/', (req, res) => {
    res.render('index', { title: '메인 페이지' });
});

module.exports = router;
