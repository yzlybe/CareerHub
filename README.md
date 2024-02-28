# CCC

Clean Coding Crew

## 프로젝트 설정

1 Git clone https://github.com/serken0/CCC.git
2 cd ccc
3 npm install
4 .env 파일 생성 5. 파일 내용 작성
DB_USERNAME=자신의 데이터베이스 계정 ex.sesac
DB_PASSWORD=자신의 데이터베이스 비밀번호 ex.1234
DB_DATABASE=데이터베이스 이름 ex.sesac
PORT=자유롭게 설정
SECRET=자유롭게 설정

## 실행

node app.js

## merge 후 develop 브랜치 최신화 하기

git switch develop > git pull origin develop

## 컨벤션 참조

커밋 메세지 컨벤션 https://www.notion.so/Git-Commit-Message-Convention-39c4ecf3d1394f68b43a6f759d82388a?pvs=4
코드 컨벤션 https://www.notion.so/Code-Convention-3cf9c66b173747eb9e0573a3d6b2e8ef?pvs=4
