//main.js

// 데이터를 동적으로 렌더링하기 위한 샘플 데이터
const portfolioData = [
    {
        id: 1,
        title: "다음",
        date: "2020년 01월 31일 작성",
        tags: ["React", "JavaScript", "CSS"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 1, // 즐겨찾기한 사람 수
    },

    {
        id: 2,
        title: "네이버",
        date: "2020년 01월 31일 작성",
        tags: ["React", "JavaScript", "Vue"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 724, // 즐겨찾기한 사람 수
    },
    {
        id: 3,
        title: "토스",
        date: "2020년 01월 31일 작성",
        tags: ["React", "JavaScript", "Angular"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 71, // 즐겨찾기한 사람 수
    },
    {
        id: 4,
        title: "한게임",
        date: "2020년 01월 31일 작성",
        tags: ["React", "JavaScript", "CSS", "Webpack", "HTML"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 2, // 즐겨찾기한 사람 수
    },
    {
        id: 5,
        title: "카카오",
        date: "2020년 01월 31일 작성",
        tags: ["React", "JavaScript", "CSS", "Webpack", "HTML"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 5, // 즐겨찾기한 사람 수
    },
    {
        id: 6,
        title: "노마드",
        date: "2020년 01월 31일 작성",
        tags: ["React", "JavaScript", "CSS", "Webpack", "HTML"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 0, // 즐겨찾기한 사람 수
    },
    {
        id: 7,
        title: "페이스북",
        date: "2020년 01월 31일 작성",
        tags: ["React", "JavaScript", "CSS", "Webpack", "JSX", "TypeScript"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 0, // 즐겨찾기한 사람 수
    },
    {
        id: 8,
        title: "CJ",
        date: "2020년 01월 31일 작성",
        tags: ["HTML"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 0, // 즐겨찾기한 사람 수
    },
    {
        id: 9,
        title: "롯데",
        date: "2020년 01월 31일 작성",
        tags: ["CSS", "Webpack", "Angular"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 0, // 즐겨찾기한 사람 수
    },
    {
        id: 10,
        title: "넷마블",
        date: "2020년 01월 31일 작성",
        tags: ["JavaScript", "CSS", "Webpack", "HTML"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 0, // 즐겨찾기한 사람 수
    },
    {
        id: 11,
        title: "넥슨",
        date: "2020년 01월 31일 작성",
        tags: ["JavaScript", "HTML"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 0, // 즐겨찾기한 사람 수
    },
    {
        id: 12,
        title: "NC",
        date: "2020년 01월 31일 작성",
        tags: ["React", "JavaScript", "Sass"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 0, // 즐겨찾기한 사람 수
    },
    {
        id: 13,
        title: "LASTSK",
        date: "2020년 01월 31일 작성",
        tags: ["JavaScript", "React", "CSS", "Webpack", "HTML"],
        imageUrl: "/static/images/naver.jpg", // 이미지 경로 수정
        favoriteCount: 0, // 즐겨찾기한 사람 수
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
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; // 이전 컨트롤을 지움
    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.className = currentPage === i ? "active" : "";
        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderCurrentItems();
            // 현재 페이지 버튼의 스타일을 갱신
            document
                .querySelectorAll("#pagination button")
                .forEach((btn) => (btn.className = ""));
            pageButton.className = "active";
        });
        paginationContainer.appendChild(pageButton);
    }
}
// 로컬에서 즐겨찾기 상태를 토글하는 함수
function toggleFavoriteLocal(itemId) {
    const item = portfolioData.find((item) => item.id === parseInt(itemId));
    if (item) {
        // 즐겨찾기 상태를 토글합니다.
        item.isFavorite = !item.isFavorite;
        item.favoriteCount += item.isFavorite ? 1 : -1;
        // 즐겨찾기 뷰가 활성화되어 있는지 확인
        const interestButtonIsActive = document
            .querySelector(".interest-button")
            .textContent.includes("전체 보기");

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
    document.querySelectorAll(".favorite").forEach((button) => {
        button.addEventListener("click", function () {
            const itemId =
                this.closest(".portfolioCard").getAttribute("data-item-id");
            // 로컬 즐겨찾기 상태를 토글합니다.
            toggleFavoriteLocal(itemId);
        });
    });
}
// 포트폴리오 아이템을 렌더링하는 함수
function renderItems(items) {
    const container = document.getElementById("portfolioItems");
    container.innerHTML = "";
    items.forEach(item => {
        const tagsHTML = item.tags.map(tag => `<span class="tag-button">${tag}</span>`).join(" ");
        const favoriteIcon = item.isFavorite ? "favorite" : "favorite_border";
        const favoriteColor = item.isFavorite ? "red" : "inherit";

        const cardHTML = `
            <div class="portfolioCard" data-item-id="${item.id}">
                <div class="favorite-container" onclick="event.stopPropagation(); toggleFavoriteLocal(${item.id})">
                    <span class="material-symbols-outlined favorite" style="color: ${favoriteColor};">${favoriteIcon}</span>
                    <span class="favorite-count">${item.favoriteCount}</span>
                </div>
                <img src="${item.imageUrl}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.date}</p>
                <div class="tags-container">${tagsHTML}</div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', cardHTML);
    });

    attachCardClickEvent();
}

// 포트폴리오 카드 클릭 이벤트 리스너 추가
function attachCardClickEvent() {
    document.querySelectorAll(".portfolioCard").forEach(card => {
        card.addEventListener("click", function() {
            const itemId = this.getAttribute('data-item-id');
            window.location.href = `/jobs/${itemId}`;
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderItems(portfolioData); // 초기 데이터 렌더링
});
// 즐겨찾기한 포트폴리오카드만 나오게 하기
function attachInterestButtonEventListener() {
    const interestButton = document.querySelector(".interest-button");
    interestButton.addEventListener("click", function () {
        isFavoriteMode = !isFavoriteMode; // 관심 공고 모드 상태를 토글
        // 모드에 따라 버튼 텍스트와 필터링 로직을 업데이트
        if (isFavoriteMode) {
            this.innerHTML =
                ' <span class="material-symbols-outlined">favorite</span>전체 보기 ';
        } else {
            this.innerHTML =
                ' <span class="material-symbols-outlined" id="fav">favorite</span>관심 공고 ';
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
    const favoriteItems = portfolioData.filter((item) => item.isFavorite);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    renderItems(favoriteItems.slice(startIndex, endIndex));
    renderPaginationControls(favoriteItems.length);
}
function updateActivePaginationButton() {
    document.querySelectorAll("#pagination button").forEach((button) => {
        if (parseInt(button.innerText) === currentPage) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}
// 검색 기능 처리 함수
function handleSearchInput(e) {
    const searchText = e.target.value.toLowerCase();
    if (searchText === "") {
        currentPage = 1;
        renderCurrentItems();
        renderPaginationControls(portfolioData.length);
    } else {
        const filteredCards = portfolioData.filter((item) =>
            item.title.toLowerCase().includes(searchText)
        );
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
    let filteredData = isFavoriteMode
        ? portfolioData.filter((item) => item.isFavorite)
        : portfolioData;
    const selectedTags = Array.from(
        document.querySelectorAll(".button-group button.selected")
    ).map((btn) => btn.textContent.trim());
    if (selectedTags.length > 0) {
        filteredData = filteredData.filter((item) =>
            selectedTags.every((tag) => item.tags.includes(tag))
        );
    }
    renderItems(
        filteredData.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
    );
    renderPaginationControls(filteredData.length);
    currentPage = 1;
    updateActivePaginationButton();
}
// 초기화 함수
function initialize() {
    renderCurrentItems();
    renderPaginationControls(portfolioData.length);
    attachInterestButtonEventListener();
    document
        .getElementById("searchInput")
        .addEventListener("input", handleSearchInput);
    const buttons = document.querySelectorAll(".button-group button");
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            this.classList.toggle("selected");
            updatePortfolioDisplay();
        });
    });
}
document.addEventListener("DOMContentLoaded", initialize);
//로그인,회원가입 모달
document.addEventListener("DOMContentLoaded", function () {
    const authModal = document.getElementById("authModal");
    const modalBody = document.getElementById("modalBody");
    const loginButton = document.querySelector(".login-button");
    const closeButton = document.querySelector(".close-button");

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
    window.renderLoginForm = function () {
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
        document.getElementById("loginForm").onsubmit = function (event) {
            event.preventDefault();
            login();
        };
    };

    // 로그인 폼 렌더링
    renderLoginForm();
    // 회원가입 양식 렌더링
    window.renderSignupForm = function () {
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
        document.getElementById("signupForm").onsubmit = function (event) {
            event.preventDefault();
            signup();
        };
    };
    function login() {
        const form = document.forms["loginForm"];
        const email = form["email"].value;
        const password = form["password"].value;
    
        axios({
            method: "post",
            url: "/login",
            data: {
                email: email,
                password: password,
            },
        }).then((res) => {
            console.log(res.data);
            const {result, msg} = res.data;
            if(result) {
                alert(msg);
                closeButton();
            }
        });
    }

// 로그인 버튼 UI 업데이트 함수
function updateLoginButtonUI(isLoggedIn) {
    const loginButton = document.querySelector('.login-button');
    if (isLoggedIn) {
        loginButton.textContent = '로그아웃';
        // 로그아웃 이벤트 리스너를 추가합니다.
        loginButton.removeEventListener("click", renderLoginForm);
        loginButton.addEventListener("click", logout);
    } else {
        loginButton.textContent = '로그인';
        // 로그인 모달을 표시하는 이벤트 리스너를 추가합니다.
        loginButton.removeEventListener("click", logout);
        loginButton.addEventListener("click", renderLoginForm);
    }
}




    // 회원가입 처리
    function signup() {
        const email = document.querySelector(
            "#signupForm input[name='email']"
        ).value;
        const username = document.querySelector(
            "#signupForm input[name='username']"
        ).value;
        const password = document.querySelector(
            "#signupForm input[name='password']"
        ).value;
        const confirmPassword = document.querySelector(
            "#signupForm input[name='confirm_password']"
        ).value;

        // 이메일 유효성 검사
        if (!validateEmail(email)) {
            alert("유효한 이메일 주소를 입력해주세요.");
            return;
        }

        // 비밀번호 유효성 검사
        if (!validatePassword(password)) {
            alert(
                "비밀번호는 최소 6자 이상이며, 최소 하나의 문자 및 하나의 숫자를 포함해야 합니다."
            );
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

    loginButton.addEventListener("click", function () {
        renderLoginForm();
        authModal.style.display = "block";
    });
    closeButton.addEventListener("click", function () {
        authModal.style.display = "none";
        renderLoginForm(); // 모달을 닫고 다시 열 때 로그인 양식으로 초기화
    });
    window.addEventListener("click", function (event) {
        if (event.target == authModal) {
            authModal.style.display = "none";
            renderLoginForm(); // 모달을 닫고 다시 열 때 로그인 양식으로 초기화
        }
    });
});





//드롭다운
document.addEventListener("DOMContentLoaded", function () {
    // 드롭다운 메뉴를 토글하는 함수
    function toggleDropdown() {
        document.querySelector(".dropdown-content").classList.toggle("show");
    }
    // 드롭다운 버튼에 클릭 이벤트 리스너 추가
    document
        .querySelector(".dropdown-toggle")
        .addEventListener("click", function (event) {
            toggleDropdown();
            event.stopPropagation(); // 이벤트 전파 방지
        });
    // 외부를 클릭하면 드롭다운 메뉴 닫기
    window.addEventListener("click", function (event) {
        if (!event.target.matches(".dropdown-toggle")) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains("show")) {
                    openDropdown.classList.remove("show");
                }
            }
        }
    });
    // '회원 정보 수정' 모달 열기
    const editProfileLink = document.getElementById("editProfile");
    const editProfileModal = document.getElementById("editProfileModal");
    editProfileLink.addEventListener("click", function (event) {
        event.preventDefault(); // 링크의 기본 동작 방지
        editProfileModal.style.display = "block";
    });
    // 모달 닫기 버튼 - 여기서 수정이 필요합니다.
    const closeButton = document.querySelector(
        ".edit-profile-modal .close-button"
    ); // closeButton 정의 추가
    if (closeButton) {
        // closeButton이 존재하는지 확인
        closeButton.addEventListener("click", function () {
            editProfileModal.style.display = "none";
        });
    }
    // 모달 외부 클릭 시 닫기
    window.addEventListener("click", function (event) {
        if (event.target == editProfileModal) {
            editProfileModal.style.display = "none";
        }
    });
});
//회원 탈퇴
document.addEventListener("DOMContentLoaded", function () {
    // 회원 탈퇴 링크에 클릭 이벤트 리스너 추가
    const removeAccountLink = document.querySelector('a[href="#2"]'); // 실제 적절한 선택자 사용 필요
    removeAccountLink.addEventListener("click", function (event) {
        event.preventDefault(); // 링크의 기본 동작 방지
        // 회원 탈퇴를 사용자에게 확인
        if (confirm("정말로 회원 탈퇴를 하시겠습니까?")) {
            // fetch API를 사용하여 회원 탈퇴 요청 전송
            fetch("/api/mypage", {
                // 실제 백엔드 엔드포인트 URL로 대체 필요
                method: "POST", // 또는 서버가 요구하는 메소드
                headers: {
                    "Content-Type": "application/json",
                    // 필요한 경우 인증 토큰 등의 추가 헤더를 포함해야 할 수 있음
                },
                body: JSON.stringify({
                    // 회원 탈퇴에 필요한 데이터; 예를 들어 사용자 ID나 토큰 등
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("회원 탈퇴 처리에 실패했습니다.");
                    }
                    return response.json(); // 또는 response.text(), 응답에 따라 다름
                })
                .then((data) => {
                    alert("회원 탈퇴가 성공적으로 처리되었습니다.");
                    // 회원 탈퇴 후 처리 로직; 예를 들어 로그인 페이지로 리다이렉트
                })
                .catch((error) => {
                    console.error("회원 탈퇴 중 오류 발생:", error);
                });
        }
    });
});


//공고 등록 버튼
document.addEventListener('DOMContentLoaded', function() {
    // '공고등록' 버튼에 대한 참조를 찾습니다.
    const postJobButton = document.querySelector('.fab');
  
    // 버튼 클릭 이벤트에 대한 리스너를 추가합니다.
    postJobButton.addEventListener('click', function() {
      // detail.ejs 페이지로 이동합니다.
      window.location.href = '/detail'; // 여기서 '/detail.ejs'는 서버의 실제 라우트 경로에 따라 다를 수 있습니다.
    });
  });

