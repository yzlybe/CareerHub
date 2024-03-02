//main.js


// 데이터를 동적으로 렌더링하기 위한 샘플 데이터
const portfolioData = [
  {   id:1 , 
      title: "다음",
      date: "2020년 01월 31일 작성",
      tags: ["React", "JavaScript", "CSS"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 1 // 즐겨찾기한 사람 수
    },
  
  {   id: 2, 
      title: "네이버",
      date: "2020년 01월 31일 작성",
      tags: ["React", "JavaScript", "Vue"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 724 // 즐겨찾기한 사람 수
  },
  {   id: 3, 
      title: "토스",
      date: "2020년 01월 31일 작성",
      tags: ["React", "JavaScript", "Angular"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 71// 즐겨찾기한 사람 수
  },
  {   id: 4, 
      title: "한게임",
      date: "2020년 01월 31일 작성",
      tags: ["React", "JavaScript", "CSS","Webpack","HTML"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 2 // 즐겨찾기한 사람 수
  },
  {   id: 5, 
      title: "카카오",
      date: "2020년 01월 31일 작성",
      tags: ["React", "JavaScript", "CSS","Webpack","HTML"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 5 // 즐겨찾기한 사람 수
  },
  {   id: 6, 
      title: "노마드",
      date: "2020년 01월 31일 작성",
      tags: ["React", "JavaScript", "CSS","Webpack","HTML"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 0 // 즐겨찾기한 사람 수
  },
  {   id: 7, 
      title: "페이스북",
      date: "2020년 01월 31일 작성",
      tags: ["React", "JavaScript", "CSS","Webpack","JSX","TypeScript"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 0 // 즐겨찾기한 사람 수
  },
  {   id: 8, 
      title: "CJ",
      date: "2020년 01월 31일 작성",
      tags: ["HTML"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 0 // 즐겨찾기한 사람 수
  },
  {   id: 9, 
      title: "롯데",
      date: "2020년 01월 31일 작성",
      tags: [ "CSS","Webpack","Angular"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 0 // 즐겨찾기한 사람 수
  },
  {   id: 10, 
      title: "넷마블",
      date: "2020년 01월 31일 작성",
      tags: ["JavaScript", "CSS","Webpack","HTML"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 0 // 즐겨찾기한 사람 수
  },
  {   id: 11, 
      title: "넥슨",
      date: "2020년 01월 31일 작성",
      tags: ["JavaScript","HTML"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 0 // 즐겨찾기한 사람 수
  },
  {   id: 12, 
      title: "NC",
      date: "2020년 01월 31일 작성",
      tags: ["React", "JavaScript", "Sass",],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 0 // 즐겨찾기한 사람 수
  },
  {   id: 13, 
      title: "LASTSK",
      date: "2020년 01월 31일 작성",
      tags: [ "JavaScript","React", "CSS","Webpack","HTML"],
      imageUrl: "/static/images/naver.jpg" // 이미지 경로 수정
      ,favoriteCount: 0 // 즐겨찾기한 사람 수
  },

  // 추가 포트폴리오 아이템들...
];



let currentPage = 1;
const itemsPerPage = 12;
const maxPageNumberLimit = 10;
let maxPageNumber = maxPageNumberLimit;
let minPageNumber = 0;




function renderCurrentItems() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToRender = portfolioData.slice(startIndex, endIndex);
  renderItems(itemsToRender);
}

// 페이지네이션 컨트롤을 렌더링하는 함수
function renderPaginationControls(totalItems) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = ''; // 이전 컨트롤을 지움

  for (let i = 1; i <= pageCount; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.className = currentPage === i ? 'active' : '';
    pageButton.addEventListener('click', () => {
      currentPage = i;
      renderCurrentItems();
      // 현재 페이지 버튼의 스타일을 갱신
      document.querySelectorAll('#pagination button').forEach(btn => btn.className = '');
      pageButton.className = 'active';
    });
    paginationContainer.appendChild(pageButton);
  }
}



// 로컬에서 즐겨찾기 상태를 토글하는 함수
function toggleFavoriteLocal(itemId) {
  const item = portfolioData.find(item => item.id === parseInt(itemId));
  if (item) {
      // 즐겨찾기 상태를 토글합니다.
      item.isFavorite = !item.isFavorite;
      item.favoriteCount += item.isFavorite ? 1 : -1;
      // 즐겨찾기 뷰가 활성화되어 있는지 확인
      const interestButtonIsActive = document.querySelector('.interest-button').textContent.includes("전체 보기");
      
      // 즐겨찾기 뷰가 활성화되어 있으면, 즐겨찾기된 아이템만 다시 렌더링
      if (interestButtonIsActive) {
          showFavoritesOnly();
      } else {
          // 그렇지 않으면, 현재 페이지의 아이템을 다시 렌더링
          renderCurrentItems();
      }
  }
}


function attachFavoriteEventListeners() {
  document.querySelectorAll('.favorite').forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.closest('.portfolioCard').getAttribute('data-item-id');
      // 로컬 즐겨찾기 상태를 토글합니다.
      toggleFavoriteLocal(itemId);
    });
  });
}

// 포트폴리오 아이템을 렌더링하는 함수
function renderItems(items) {
const container = document.getElementById('portfolioItems');
container.innerHTML = '';
items.forEach(item => {
    const tagsHTML = item.tags.map(tag => `<span class="tag-button">${tag}</span>`).join(' ');
    const favoriteIcon = item.isFavorite ? 'favorite' : 'favorite_border';
    const favoriteColor = item.isFavorite ? 'red' : 'inherit'; // 즐겨찾기 상태에 따른 색상 변경
    
    // 즐겨찾기 카운트를 표시합니다. 0일 경우에도 숫자가 보입니다.
    const favoriteCountText = item.favoriteCount;



    container.innerHTML += `
      <div class="portfolioCard" data-item-id="${item.id}">
        <div class="favorite-container">
          <span class="material-symbols-outlined favorite" style="color: ${favoriteColor};">${favoriteIcon}</span>
          <span class="favorite-count">${favoriteCountText}</span> <!-- 즐겨찾기 카운트 표시, 0일 경우에도 표시 -->
        </div>
        <img src="${item.imageUrl}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.date}</p>
        <div class="tags-container">${tagsHTML}</div>
      </div>
    `;
});
attachFavoriteEventListeners();
}



// 즐겨찾기한 포트폴리오카드만 나오게 하기


function attachInterestButtonEventListener() {
  const interestButton = document.querySelector('.interest-button');
  interestButton.addEventListener('click', function() {
      isFavoriteMode = !isFavoriteMode; // 관심 공고 모드 상태를 토글
      // 모드에 따라 버튼 텍스트와 필터링 로직을 업데이트
      if (isFavoriteMode) {
          this.innerHTML = ' <span class="material-symbols-outlined">favorite</span>전체 보기 ';
      } else {
          this.innerHTML = ' <span class="material-symbols-outlined" id="fav">favorite</span>관심 공고 ';
      }
      updatePortfolioDisplay(); // 변경된 모드에 따라 디스플레이 업데이트
  });
}

// 전체 공고를 보여주는 함수
function showAllItems() {
 
  renderItems(portfolioData.slice(0, itemsPerPage));
  renderPaginationControls(portfolioData.length);
  currentPage = 1;
  updateActivePaginationButton();
}

function showFavoritesOnly() {
currentPage = 1; 
const favoriteItems = portfolioData.filter(item => item.isFavorite);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
renderItems(favoriteItems.slice(startIndex, endIndex));
renderPaginationControls(favoriteItems.length);
}

function updateActivePaginationButton() {
  document.querySelectorAll('#pagination button').forEach(button => {
      if (parseInt(button.innerText) === currentPage) {
          button.classList.add('active');
      } else {
          button.classList.remove('active');
      }
  });
}

// 검색 기능 처리 함수
function handleSearchInput(e) {
  const searchText = e.target.value.toLowerCase();
  if (searchText === '') {
    currentPage = 1;
    renderCurrentItems();
    renderPaginationControls(portfolioData.length);
  } else {
    const filteredCards = portfolioData.filter(item => item.title.toLowerCase().includes(searchText));
    currentPage = 1;
    renderItems(filteredCards.slice(0, itemsPerPage));
    renderPaginationControls(filteredCards.length);
  }
}



let isFavoriteMode = false; // '관심 공고' 모드가 활성화되어 있는지 추적

function toggleFavoriteMode() {
  isFavoriteMode = !isFavoriteMode;
  updatePortfolioDisplay(); // 모드 변경 시 데이터 다시 렌더링
}

function updatePortfolioDisplay() {
  let filteredData = isFavoriteMode ? portfolioData.filter(item => item.isFavorite) : portfolioData;

  const selectedTags = Array.from(document.querySelectorAll('.button-group button.selected')).map(btn => btn.textContent.trim());
  if (selectedTags.length > 0) {
      filteredData = filteredData.filter(item => selectedTags.every(tag => item.tags.includes(tag)));
  }

  renderItems(filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  renderPaginationControls(filteredData.length);
  currentPage = 1;
  updateActivePaginationButton();
}

// 초기화 함수
function initialize() {
  renderCurrentItems();
  renderPaginationControls(portfolioData.length);
  attachInterestButtonEventListener();
  document.getElementById('searchInput').addEventListener('input', handleSearchInput);

  const buttons = document.querySelectorAll('.button-group button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('selected');
      updatePortfolioDisplay();
    });
  });
}


document.addEventListener('DOMContentLoaded', initialize);

//로그인,회원가입 모달
 
document.addEventListener('DOMContentLoaded', function() {
  const authModal = document.getElementById('authModal');
  const modalBody = document.getElementById('modalBody');
  const loginButton = document.querySelector('.login-button');
  const closeButton = document.querySelector('.close-button');

  // 이메일 유효성 검사
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // 비밀번호 유효성 검사
  function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(password);
  }

  // 로그인 양식 렌더링
  window.renderLoginForm = function() {
    modalBody.innerHTML = `
      <h2>로그인</h2>
      <form id="loginForm">
        <input type="email" name="email" placeholder="이메일 주소" required><br>
        <input type="password" name="password" placeholder="비밀번호" required><br>
        <button type="submit" class="login-action">로그인</button>
        <button type="button" onclick="renderSignupForm()">회원 가입</button>
      </form>
    `;

    // 로그인 폼 submit 이벤트 처리
    document.getElementById('loginForm').onsubmit = function(event) {
      event.preventDefault();
      login();
    };
  };

  // 회원가입 양식 렌더링
  window.renderSignupForm = function() {
    modalBody.innerHTML = `
      <h2>회원가입</h2>
      <form id="signupForm">
        <input type="email" name="email" placeholder="이메일 주소" required><br>
        <input type="text" name="username" placeholder="닉네임" required><br>
        <input type="password" name="password" placeholder="비밀번호" required><br>
        <input type="password" name="confirm_password" placeholder="비밀번호 확인" required><br>
        <button type="submit" class="signup-action">회원 가입</button>
        <button type="button" onclick="renderLoginForm()">뒤로 가기</button>
      </form>
    `;

    // 회원가입 폼 submit 이벤트 처리
    document.getElementById('signupForm').onsubmit = function(event) {
      event.preventDefault();
      signup();
    };
  };

  // 로그인 처리
  function login() {
    const email = document.querySelector("#loginForm input[name='email']").value;
    const password = document.querySelector("#loginForm input[name='password']").value;

    if (!validateEmail(email) || !validatePassword(password)) {
      alert("이메일 또는 비밀번호가 유효하지 않습니다.");
      return;
    }

    console.log("로그인 성공", email);
    // 여기서 서버로 로그인 요청을 보냅니다.
  }

  // 회원가입 처리
  function signup() {
    const email = document.querySelector("#signupForm input[name='email']").value;
    const username = document.querySelector("#signupForm input[name='username']").value;
    const password = document.querySelector("#signupForm input[name='password']").value;
    const confirmPassword = document.querySelector("#signupForm input[name='confirm_password']").value;
  
    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }
  
    // 비밀번호 유효성 검사
    if (!validatePassword(password)) {
      alert("비밀번호는 최소 6자 이상이며, 최소 하나의 문자 및 하나의 숫자를 포함해야 합니다.");
      return;
    }
  
    // 비밀번호 일치 검사
    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
  
    // 서버로 회원가입 요청 로직을 여기에 추가
    console.log("회원가입 요청: ", email, username, password);
    // 실제 애플리케이션에서는 여기서 서버로 폼 데이터를 전송하는 AJAX 요청 등을 수행합니다.
  }
  

  loginButton.addEventListener('click', function() {
    renderLoginForm();
    authModal.style.display = 'block';
  });

  closeButton.addEventListener('click', function() {
    authModal.style.display = 'none';
    renderLoginForm(); // 모달을 닫고 다시 열 때 로그인 양식으로 초기화
  });

  window.addEventListener('click', function(event) {
    if (event.target == authModal) {
      authModal.style.display = 'none';
      renderLoginForm(); // 모달을 닫고 다시 열 때 로그인 양식으로 초기화
    }
  });
});
