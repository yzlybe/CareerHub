const express = require('express');
const router = express.Router();

// 마이페이지 라우트
router.get('/mypage', (req, res) => {
    const userInfo = {
        name: '홍길동',
        email: 'hong@example.com'
    };
    const favoriteProducts = [
        { name: '상품 A', price: '10000원' },
        { name: '상품 B', price: '20000원' }
    ];
    const myReviews = [
        { productName: '상품 A', content: '리뷰 내용 A' },
        { productName: '상품 B', content: '리뷰 내용 B' }
    ];
    const likedProducts = [
        { name: '상품 C', price: '15000원' },
        { name: '상품 D', price: '25000원' }
    ];

    res.render('myPage', {
        userInfo: userInfo,
        favoriteProducts: favoriteProducts,
        myReviews: myReviews,
        likedProducts: likedProducts
    });
});

module.exports = router;
