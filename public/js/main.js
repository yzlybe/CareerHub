//main.js

// 데이터를 동적으로 렌더링하기 위한 샘플 데이터
/* const portfolioData = [
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
]; */

let portfolioData = [];

async function connectList() {
    try {
        const res = await axios({
            method: "get",
            url: "/main",
        });

        // 배열 초기화
        portfolioData = [];

        // res.data 배열의 각 요소를 순회하면서 portfolioData 배열에 객체 추가
        for (let i = 0; i < res.data.length; i++) {
            // 객체 생성 및 속성 할당
            let portfolioItem = {};
            portfolioItem.id = res.data[i].jobs_id;
            portfolioItem.title = res.data[i].company_name;
            portfolioItem.date = res.data[i].created_at;
            // portfolioItem.tags=res.data[i].jobs_id; // 필요시 주석 해제
            portfolioItem.tags = ["React"]; // 필요시 주석 해제
            portfolioItem.imageUrl = res.data[i].img_path;
            portfolioItem.favoriteCount = res.data[i].cnt_likes;
            // portfolioData 배열에 객체 추가
            portfolioData.push(portfolioItem);
        }

        return portfolioData;
    } catch (error) {
        throw new Error("Error fetching data:", error);
    }
}

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
    items.forEach((item) => {
        const tagsHTML = item.tags
            .map((tag) => `<span class="tag-button">${tag}</span>`)
            .join(" ");
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

        container.insertAdjacentHTML("beforeend", cardHTML);
    });

    attachCardClickEvent();
}

// 포트폴리오 카드 클릭 이벤트 리스너 추가
function attachCardClickEvent() {
    document.querySelectorAll(".portfolioCard").forEach((card) => {
        card.addEventListener("click", function () {
            const itemId = this.getAttribute("data-item-id");
            window.location.href = `/jobs/${itemId}`;
        });
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    try {
        await connectList();
        console.log(portfolioData); // 데이터 확인
        renderItems(portfolioData); // 데이터가 완전히 가져와진 후 렌더링
    } catch (error) {
        console.error("Error fetching data:", error);
    }
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
    //로그인 db연동

    function updateLoginState(isLoggedIn) {
        const loginButton = document.querySelector(".login-button");
        const dropdown = document.querySelector(".dropdown"); // 드롭다운 요소 선택
        const interestButton = document.querySelector(".interest-button"); // 관심 공고 버튼 선택
        const iconSpan = loginButton.querySelector(".material-symbols-outlined");
    
        if (isLoggedIn) {
            // 사용자가 로그인한 상태일 때
            iconSpan.textContent = "logout"; // 아이콘을 로그아웃 아이콘으로 변경
            loginButton.innerHTML = ""; // 버튼의 내용을 지우고
            loginButton.appendChild(iconSpan); // 아이콘을 먼저 추가한 후
            loginButton.append(" Log Out"); // 텍스트를 추가합니다.
            loginButton.removeEventListener("click", handleLoginClick); // 기존 로그인 클릭 이벤트 리스너 제거
            loginButton.addEventListener("click", logout); // 로그아웃 이벤트 리스너 추가
        
            dropdown.style.display = "block"; // 드롭다운 버튼 보이게 설정
            interestButton.style.display = "block"; // 관심 공고 버튼 보이게 설정
        } else {
            // 사용자가 로그아웃한 상태일 때
            iconSpan.textContent = "login"; // 아이콘을 로그인 아이콘으로 변경
            loginButton.innerHTML = ""; // 버튼의 내용을 지우고
            loginButton.appendChild(iconSpan); // 아이콘을 먼저 추가한 후
            loginButton.append(" Log In"); // 텍스트를 추가합니다.
            loginButton.removeEventListener("click", logout); // 기존 로그아웃 클릭 이벤트 리스너 제거
            loginButton.addEventListener("click", handleLoginClick); // 로그인 모달 표시 이벤트 리스너 추가
        
            dropdown.style.display = "none"; // 드롭다운 버튼 숨기기
            interestButton.style.display = "none"; // 관심 공고 버튼 숨기기
        }
        
    }
    
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
        })
            .then((res) => {
                console.log(res.data);
                const { result, msg } = res.data; // 가정: 서버에서 {result: true/false, msg: '메시지'} 형태로 응답
                if (result) {
                    alert(msg); // 성공 메시지 알림
                    closeAuthModal(); // 모달 닫기 함수 호출
                    updateLoginState(true);
                } else {
                    alert(msg); // 실패 메시지 알림
                }
            })
            .catch((error) => {
                console.error("로그인 중 오류 발생:", error);
            });
        
    }
    function logout() {
        axios({
            method: "get",
            url: "/logout", // 가정: 로그아웃을 처리하는 서버의 엔드포인트
        })
            .then((res) => {
                // console.log(res.data);
                // const { result, msg } = res.data; // 가정: 서버에서 {result: true/false, msg: '메시지'} 형태로 응답
                // if (result) {
                    alert('성공'); // 성공 메시지 알림
                    updateLoginState(false);
                // } else {

                // }
            })
            .catch((error) => {
                console.error("로그아웃 중 오류 발생:", error);
            });
        
        closeAuthModal();
    }
    //로그인시 모달을 닫는 함수
    function closeAuthModal() {
        const authModal = document.getElementById("authModal");
        authModal.style.display = "none";
    }
    // 로그인 모달을 표시하는 함수
    function handleLoginClick() {
        const authModal = document.getElementById("authModal");
        authModal.style.display = "block";
    }
   

    function handleLoginButtonClick() {
        const isLoggedIn =
            document.querySelector(".login-button").textContent === "LogOut";
        if (isLoggedIn) {
            logout();
        } else {
            handleLoginClick();
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        // 초기 로그인 상태는 로그아웃으로 가정
        updateLoginState(false);
        const loginButton = document.querySelector(".login-button");
        loginButton.addEventListener("click", handleLoginButtonClick);
    });

    // 회원가입 처리
   
document.addEventListener("DOMContentLoaded", function() {
    const editProfileSubmitButton = document.getElementById("editProfileSubmitButton");
    if (editProfileSubmitButton) {
        editProfileSubmitButton.addEventListener("click", function() {
            const nickname = document.querySelector("#editProfileForm input[name='nickname']").value;
            const password = document.querySelector("#editProfileForm input[name='password']").value;
        
            // 여기에 AJAX 요청 로직을 추가합니다.
            axios({
                method: "patch",
                url: "/mypage",
                data: {
                    nickname: nickname,
                    password: password,  
                },
            })
            .then((response) => {
                console.log(response.data);
                alert("회원 정보가 성공적으로 수정되었습니다.");
                document.getElementById("editProfileModal").style.display = "none";
            })
            .catch((error) => {
                console.error("회원 정보 수정 중 오류 발생:", error);
                alert("회원 정보 수정 중 오류가 발생하였습니다.");
            });
        });
    }
});

    
    

    loginButton.addEventListener("click", function () {
        renderLoginForm();
        authModal.style.display = "block";
    });
    closeButton.addEventListener("click", function () {
        authModal.style.display = "none";
        renderLoginForm(); // 모달을 닫고 다시 열 때 로그인 양식으로 초기화
    });
    // window.addEventListener("click", function (event) {
    //     if (event.target == authModal) {
    //         authModal.style.display = "none";
    //         renderLoginForm(); // 모달을 닫고 다시 열 때 로그인 양식으로 초기화
    //     }
    // });
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
const editProfileButton = document.getElementById("editProfileButton");
const editProfileModal = document.getElementById("editProfileModal");
const editProfileSubmitButton = document.getElementById("editProfileSubmitButton");
const closeButton = document.querySelector(".edit-profile-modal .close-button");

editProfileButton.addEventListener("click", function(event) {
    event.preventDefault(); // 버튼의 기본 동작 방지
    editProfileModal.style.display = "block"; // 모달 표시
});

// 모달 닫기 버튼 이벤트 핸들러
if (closeButton) {
    closeButton.addEventListener("click", function () {
        editProfileModal.style.display = "none";
    });
}

// 회원 정보 수정 버튼 이벤트 핸들러
editProfileSubmitButton.addEventListener("click", function(event) {
    event.preventDefault(); // 버튼의 기본 동작 방지

    // 사용자 입력 값 가져오기
    const nickname = document.querySelector("#editProfileForm input[name='nickname']").value;
    const password = document.querySelector("#editProfileForm input[name='password']").value;

    // 유효성 검사
    if (!nickname || !password) {
        alert("닉네임과 비밀번호를 모두 입력하세요.");
        return;
    }

    // 회원 정보 수정 요청
    axios.patch("/mypage", { nickname, password })
        .then((response) => {
            console.log(response.data);
            alert("회원 정보가 성공적으로 수정되었습니다.");
            editProfileModal.style.display = "none"; // 모달 닫기
        })
        .catch((error) => {
            console.error("회원 정보 수정 중 오류 발생:", error.response.data);
            alert("회원 정보 수정 중 오류가 발생하였습니다.");
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



});
//공고 등록 버튼
document.addEventListener("DOMContentLoaded", function () {
    // '공고등록' 버튼에 대한 참조를 찾습니다.
    const postJobButton = document.querySelector(".fab");

    // 버튼 클릭 이벤트에 대한 리스너를 추가합니다.
    postJobButton.addEventListener("click", function () {
        // detail.ejs 페이지로 이동합니다.
        window.location.href = "/detail"; // 여기서 '/detail.ejs'는 서버의 실제 라우트 경로에 따라 다를 수 있습니다.
    });
});
