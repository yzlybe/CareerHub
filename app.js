const express = require('express');
const app = express();
const path = require('path');

// 뷰 엔진과 뷰 파일 경로 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'CCC/views'));

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, 'public')));

// 라우트 모듈 가져오기
const indexRouter = require('./CCC/routes/index');
const userRouter = require('./CCC/routes/user');

// 라우트 사용
app.use('/', indexRouter);
app.use('/user', userRouter);

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
