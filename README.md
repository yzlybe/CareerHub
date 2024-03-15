
## CareerHub
![image](https://github.com/serken0/CCC/assets/140472588/32080eff-b875-4356-bb31-e5eab59d3cdb)

## 소개
구인 공고 공유 사이트
개발자들을 위한 취업정보(채용정보) 공유 사이트입니다.

## 배포 주소
http://www.careerhub.store:8000

## 팀원 소개

<div align="center">
    <table>
      <tr>
        <th><img src="https://github.com/serken0/CCC/assets/140472588/ffcc3dc6-758a-426e-a985-de68fceef24a" width=150px></th>
        <th><img src="https://github.com/serken0/CCC/assets/140472588/667d13a5-ad98-4e30-9175-766b3fd56d55" width=150px></th>
        <th><img src="https://github.com/serken0/CCC/assets/140472588/34400d3a-1529-4432-8db5-efd1f998f851" width=150px></th>
        <th><img src="https://github.com/serken0/CCC/assets/140472588/9d26088c-302e-4c26-b35d-fdbb2d932df4" width=150px></th>
        <th><img src="https://github.com/serken0/CCC/assets/140472588/e6cf26bd-8175-49ed-835f-5c2dee72a837" width=150px></th>
      </tr>
      <tr>
        <td align="center">김시연</td>
        <td align="center">김성민</td>
        <td align="center">최윤정</td>
        <td align="center">전재민</td>
        <td align="center">김예지</td>
      </tr>
      <tr>
        <td align="center">백엔드</td>
        <td align="center">백엔드</td>
        <td align="center">프론트엔드</td>
        <td align="center">프론트엔드</td>
        <td align="center">프론트엔드</td>
      </tr>
    </table>
</div>

  
 
  
  
  
</div>
<div>
  <h2></h2>
</div>




## 사용기술

<div align=center> 
<!-- html5 -->
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<!-- js -->
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <!-- css -->
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <!-- node.js -->
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <!-- express -->
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <!-- mysql -->
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<!-- sequelize -->
  <img src="https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white">
<!-- .env -->
  <img src="https://img.shields.io/badge/.env-ECD53F?style=for-the-badge&logo=env&logoColor=white">
</div>

## 협업 툴
<div align=center> 
<!-- git -->
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<!-- github -->
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<!-- slack -->
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
<!-- notion -->
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
</div>

## 실행 가이드
### 설치
```
$ git clone https://github.com/serken0/CCC.git
$ cd ccc
$ npm install
```
### 환경변수 (.env 파일 생성)
```
DB_USERNAME=로컬DB계정
DB_PASSWORD=로컬DB비밀번호
DB_DATABASE=로컬DB이름
PORT=8000
SECRET=secretkey
GOOGLE_CLIENT_ID=구글 로그인 테스트시 필요
GOOGLE_CLIENT_SECRET=구글 로그인 테스트시 필요
GOOGLE_LOGIN_REDIRECT_URI=구글 로그인 테스트시 필요
GOOGLE_SIGNUP_REDIRECT_URI=구글 로그인 테스트시 필요
GOOGLE_TOKEN_URL=구글 로그인 테스트시 필요
GOOGLE_USERINFO_URL=구글 로그인 테스트시 필요
KAKAO_MAP_API_KEY=카카오 지도 API 테스트시 필요
```
### 실행
```
$ npm run dev
```

## 주요기능
### 1.일반 회원가입 및 로그인
![1 회원가입 로그인](https://github.com/serken0/CCC/assets/140472588/09a1b522-669e-4838-8f77-3b1a05db3d2d)
### 2. 소셜(구글) 회원가입
![4 구글 회원가입](https://github.com/serken0/CCC/assets/140472588/81a35c0c-571a-4cde-a549-620830c7f6d3)
### 3. 소셜(구글) 로그인
![3 구글 로그인](https://github.com/serken0/CCC/assets/140472588/2ded8357-4cbf-414e-aa71-e339660c12e8)
### 4. 필터링, 검색기능, 즐겨찾기, 페이지네이션
![페이지네이션](https://github.com/serken0/CCC/assets/140472588/68f44648-3abd-4397-a9ac-2844c2a8d3b5)
### 5. 공고 CRUD
![공고등록후조회](https://github.com/serken0/CCC/assets/140472588/206d4501-ddd2-465d-8207-cd83c498ab0f)
### 6. 리뷰 CRUD
![공고수정및_리뷰CRUD](https://github.com/serken0/CCC/assets/140472588/839d9797-ccb9-4f5c-8756-c22f48a881b2)
### 7. 내가 쓴 공고 목록 조회
![내가쓴공고](https://github.com/serken0/CCC/assets/140472588/1e96feaa-3daf-4260-8a8d-31e6ba9a342d)
### 8. 최근 본 공고 목록 조회
![최근본공고](https://github.com/serken0/CCC/assets/140472588/e74d10ba-643d-4290-9408-bd2129d68b28)
### 9. 다크모드
![다크모드](https://github.com/serken0/CCC/assets/140472588/05b1e7a1-a656-4519-b273-aced667c338a)


## Reference
<a href="https://husky-willow-29c.notion.site/API-Docs-1f226e42dcc941c0960f4b806e91b211?pvs=4">API 명세서</a><br>
<a href="https://www.erdcloud.com/d/c8heLktDgWrn5TxjM">ERD Cloud</a><br>
<a href="https://husky-willow-29c.notion.site/API-Docs-1f226e42dcc941c0960f4b806e91b211?pvs=4">컨벤션</a><br>
<a href="">피그마</a><br>


