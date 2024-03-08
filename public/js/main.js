main.js;
// 데이터 로딩 및 처리
async function fetchData(url) {
    try {
        url = "/main";
        const res = await axios.get(url); // 주어진 URL에서 데이터 가져오기
        return res.data.map((dataItem) => {
            // 가져온 데이터를 변환하여 반환
            const stacks = dataItem.stack; // 서버에서 스택 객체를 가져와 저장
            const techStack = Object.keys(stacks).filter((key) => stacks[key]); // true인 스택만 필터링하여 배열로 가져옴
            const tags = techStack.map((tag) => {
                // 첫 글자 대문자로 변환하여 태그 추가
                if (tag === "typescript") return "TypeScript";
                if (tag === "javascript") return "JavaScript";
                if (tag === "css") return "CSS";
                if (tag === "jsx") return "JSX";
                if (tag === "html") return "HTML";
                return tag.charAt(0).toUpperCase() + tag.slice(1);
            });
            const finalTags = tags.length > 0 ? tags : ["없음"]; // 스택이 없으면 "없음" 태그를 사용
            return {
                id: dataItem.jobs_id,
                title: dataItem.company_name,
                date: dataItem.created_at,
                tags: finalTags, // 스택이 없으면 "없음" 태그로 설정
                imageUrl: dataItem.img_path,
                favoriteCount: dataItem.cnt_likes,
                isFavorite: false, // 초기 즐겨찾기 상태는 false로 설정
            };
        });
    } catch (error) {
        console.error("Error fetching data:", error); // 오류 발생 시 콘솔에 오류 메시지 출력
        return []; // 오류가 발생했을 때는 빈 배열 반환
    }
}

//로그인시 모달을 닫는 함수
function closeAuthModal() {
    const authModal = document.getElementById("authModal");
    authModal.style.display = "none";
}
let portfolioData = [];
let currentPage = 1;
const itemsPerPage = 12;
let isFavoriteMode = false; // '관심 공고' 모드를 추적하는 상태
function logout() {
    axios({
        method: "get",
        url: "/logout", // 로그아웃을 처리하는 서버의 엔드포인트
    })
        .then((res) => {
            portfolioData.forEach((item) => (item.isFavorite = false));
            localStorage.removeItem("nickname");
            localStorage.removeItem("userId");
            updateDisplay();
            updateLoginState("false"); // 로컬 스토리지에 로그아웃 상태 반영
            // 페이지 리로드 또는 UI 업데이트 등 필요한 추가 작업 수행
            alert("로그아웃되었습니다."); // 성공 메시지 알림
            window.location.href = "/";
        })
        .catch((error) => {
            console.error("로그아웃 중 오류 발생:", error);
        });

    closeAuthModal(); // 로그아웃 시 모달 닫기
}
function handleLoginClick() {
    const authModal = document.getElementById("authModal");
    authModal.style.display = "block";
}
function updateLoginState(isLoggedInState) {
    // 로컬 스토리지의 상태를 업데이트
    localStorage.setItem("isLoggedIn", isLoggedInState);
    isLoggedIn = isLoggedInState === "true"; // 문자열로 저장된 상태를 불리언으로 변환
    const loginButton = document.querySelector(".login-button");
    const dropdown = document.querySelector(".dropdown");
    const interestButton = document.querySelector(".interest-button");
    if (isLoggedIn) {
        // 로그아웃 상태일 때 보여줄 아이콘과 텍스트
        loginButton.innerHTML = `<span class="material-icons">logout</span> Log Out`;
        dropdown.style.display = "block";
        interestButton.style.display = "block";
        loginButton.removeEventListener("click", handleLoginClick); // 기존 이벤트 리스너 제거
        loginButton.addEventListener("click", logout); // 새 이벤트 리스너 연결
    } else {
        // 로그인 상태일 때 보여줄 아이콘과 텍스트
        loginButton.innerHTML = `<span class="material-icons">login</span> Log In`;
        dropdown.style.display = "none";
        interestButton.style.display = "none";
        loginButton.removeEventListener("click", logout); // 기존 이벤트 리스너 제거
        loginButton.addEventListener("click", handleLoginClick); // 새 이벤트 리스너 연결
    }
}
// 동적 이벤트 리스너 설정 (즐겨찾기 버튼 등)
function attachDynamicEventListeners() {
    attachFavoriteEventListeners();
    attachCardClickEvent();
}
document.addEventListener("DOMContentLoaded", async () => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") || "false";
    updateLoginState(storedIsLoggedIn === "true" ? "true" : "false");

    // 메인 데이터 로딩
    portfolioData = await fetchData("/main");

    // 초기화 함수 호출
    initialize();

    // 로그인 상태일 경우에만 즐겨찾기 목록 로드
    if (storedIsLoggedIn === "true") {
        await loadFavorites(); // 즐겨찾기 목록 로드
    }
});

// 초기화 및 이벤트 리스너 설정
function initialize() {
    updateDisplay(getCurrentPageItems(), portfolioData.length);
    attachStaticEventListeners();
}
// 현재 페이지 아이템 가져오기
function getCurrentPageItems(filteredData = getFilteredData()) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
}
// 필터링된 데이터 반환
function getFilteredData() {
    // 현재 검색어, 즐겨찾기 상태, 선택된 태그를 모두 고려하여 데이터를 필터링
    return portfolioData.filter((item) => {
        const matchesSearchText = item.title
            .toLowerCase()
            .includes(currentSearchText);
        const matchesFavorite = !isFavoriteMode || item.isFavorite;
        const matchesTags =
            selectedTags.length === 0 ||
            selectedTags.every((tag) => item.tags.includes(tag));
        return matchesSearchText && matchesFavorite && matchesTags;
    });
}
// 정적 이벤트 리스너 설정 (검색 입력, 관심 공고 버튼 등)
function attachStaticEventListeners() {
    document
        .getElementById("searchInput")
        .addEventListener("input", handleSearchInput);
    document
        .querySelector(".interest-button")
        .addEventListener("click", toggleFavoriteModeAndView);
    // 태그 필터링 버튼 이벤트 리스너 등록 등
}
// 아이템 렌더링
function renderItems(items) {
    const container = document.getElementById("portfolioItems");
    container.innerHTML = items
        .map(
            (item) => `
        <div class="portfolioCard" data-item-id="${item.id}">
            <div class="favorite-container" onclick="event.stopPropagation(); toggleFavoriteLocal('${
                item.id
            }')">
                <span class="material-symbols-outlined favorite" style="color: ${
                    item.isFavorite ? "red" : "inherit"
                };">${item.isFavorite ? "favorite" : "favorite_border"}</span>
                <span class="favorite-count">${item.favoriteCount}</span>
            </div>
            <img src="${item.imageUrl}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.date}</p>
            <div class="tags-container">${item.tags
                .map((tag) => `<span class="tag-button">${tag}</span>`)
                .join(" ")}</div>
        </div>
    `
        )
        .join("");
}
// 페이지네이션 컨트롤
function renderPaginationControls(totalItems) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    // "최근 본 공고"를 보고 있을 때는 항상 1페이지만 나타나도록 설정
    if (viewingRecentPortfolios) {
        paginationContainer.innerHTML = `<button class="active" onclick="changePage(1)">1</button>`;
    } else {
        // 전체 공고 목록을 보고 있을 때는 전체 페이지네이션 렌더링
        const pageCount = Math.ceil(totalItems / itemsPerPage);
        for (let i = 1; i <= pageCount; i++) {
            paginationContainer.innerHTML += `<button class="${
                currentPage === i ? "active" : ""
            }" onclick="changePage(${i})">${i}</button>`;
        }
    }
}

function changePage(page) {
    currentPage = page;
    updateDisplay(getCurrentPageItems(), getFilteredData().length);
}
// 즐겨찾기 토글(수정 jobs like)
function toggleFavoriteLocal(itemId) {
    // 로그인 상태가 아니라면 기능 수행을 막음
    if (!isLoggedIn) {
        alert("로그인이 필요한 기능입니다.");
        return;
    }
    itemId = parseInt(itemId);
    const item = portfolioData.find((item) => item.id === itemId);
    if (item) {
        // 즐겨찾기 상태를 토글
        const newFavoriteStatus = !item.isFavorite;

        // 즐겨찾기 추가 또는 제거에 따른 엔드포인트 선택
        const url = newFavoriteStatus ? "/like" : "/unlike";

        axios
            .patch(url, { jobsId: itemId })
            .then((response) => {
                // 서버 요청 성공 후 로컬 상태 업데이트
                item.isFavorite = newFavoriteStatus;
                item.favoriteCount += newFavoriteStatus ? 1 : -1;
                saveFavoritesToLocalStorage();
                updateDisplay();
                console.log(response.data);
                alert(
                    `관심 등록 ${
                        newFavoriteStatus ? "추가" : "삭제"
                    }되었습니다.`
                );
            })
            .catch((error) => {
                console.error("관심 등록 변경 중 오류 발생:", error);
                alert("관심 등록 변경 중 오류가 발생했습니다.");
            });
    }
}
function saveFavoritesToLocalStorage() {
    // 즐겨찾기된 항목의 ID만 추출
    const favoriteIds = portfolioData
        .filter((item) => item.isFavorite)
        .map((item) => item.id);

    // 로컬 스토리지에 JSON 형태로 저장
    localStorage.setItem("userFavorites", JSON.stringify(favoriteIds));
}
async function loadFavorites() {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        console.log("User is not logged in.");
        return;
    }

    try {
        const response = await axios.get("/jobs/like", {
            withCredentials: true,
        });
        if (response.status === 200 && response.data) {
            const favoriteIds = new Set(
                response.data.map((item) => item.jobs_id)
            );
            portfolioData.forEach((item) => {
                item.isFavorite = favoriteIds.has(item.id);
            });

            updateDisplay(); // UI 업데이트 함수 호출
        }
    } catch (error) {
        console.error("Failed to load favorites:", error);
    }
}

// 이벤트 리스너 동적 추가
function attachFavoriteEventListeners() {
    document.querySelectorAll(".favorite-container").forEach((container) => {
        container.onclick = (event) => {
            event.stopPropagation(); // 이벤트 전파 중지
            const itemId = container.parentElement.getAttribute("data-item-id");
            toggleFavoriteLocal(itemId);
        };
    });
}
function attachCardClickEvent() {
    document.querySelectorAll(".portfolioCard").forEach((card) => {
        card.addEventListener("click", () => {
            const itemId = card.getAttribute("data-item-id");
            // 먼저 클릭 이벤트를 처리하고,
            handlePortfolioCardClick(itemId);
            // 그 다음 페이지 이동을 수행합니다.
            window.location.href = `/jobs/${itemId}`;
        });
    });
}

// 검색 처리
let currentSearchText = "";
function handleSearchInput(e) {
    currentSearchText = e.target.value.toLowerCase(); // 검색어 상태 업데이트
    filterAndDisplayItems(); // 변경된 검색어를 반영하여 아이템 필터링 및 화면 업데이트
}
let selectedTags = []; // 사용자가 선택한 태그를 추적하기 위한 배열
// 태그에 따라 아이템을 필터링하는 함수
function filterItems(tag) {
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
        selectedTags.splice(index, 1); // 태그가 이미 배열에 있다면 제거
    } else {
        selectedTags.push(tag); // 태그가 배열에 없다면 추가
    }
    filterAndDisplayItems(); // 필터링된 아이템을 기반으로 화면 업데이트
    updateTagButtons();
}
function updateTagButtons() {
    document.querySelectorAll(".button-group button").forEach((button) => {
        const tag = button.textContent.trim();
        if (selectedTags.includes(tag)) {
            button.classList.add("selected"); // 'selected' 클래스 추가
        } else {
            button.classList.remove("selected"); // 'selected' 클래스 제거
        }
    });
}
// 즐겨찾기 모드 토글 및 뷰 업데이트
function toggleFavoriteModeAndView() {
    isFavoriteMode = !isFavoriteMode;
    const interestButton = document.querySelector(".interest-button");
    if (isFavoriteMode) {
        interestButton.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
            <span class="material-symbols-outlined" style="margin-right: 8px;">favorite</span>
            <span>전체 보기</span>
        </div>`;
    } else {
        interestButton.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
            <span class="material-symbols-outlined" id="fav" style="margin-right: 8px;">favorite</span>
            <span>관심 공고</span>
        </div>`;
    }
    filterAndDisplayItems(); // 모드 전환 시 필터링 및 렌더링을 적절히 처리
}
function filterAndDisplayItems() {
    // 현재 검색어, 즐겨찾기 모드, 선택된 태그를 기준으로 데이터를 필터링
    const filteredData = getFilteredData(); // 이 함수 내부에서 currentSearchText를 사용하여 필터링
    updateDisplay(filteredData, filteredData.length);
}

// 정적 이벤트 리스너 설정
function attachStaticEventListeners() {
    document
        .getElementById("searchInput")
        .addEventListener("input", handleSearchInput);
    document
        .querySelector(".interest-button")
        .addEventListener("click", toggleFavoriteModeAndView);
}
// 데이터 및 페이지 업데이트
function updateDisplay() {
    // getFilteredData 함수를 호출하면 현재 검색어, 즐겨찾기 상태, 선택된 태그를 고려한 데이터 필터링을 수행
    const filteredData = getFilteredData();
    const itemsToShow = getCurrentPageItems(filteredData); // 필터링된 아이템을 기반으로 현재 페이지 아이템을 결정

    renderItems(itemsToShow);
    renderPaginationControls(filteredData.length); // 필터링된 아이템의 총 수를 기반으로 페이지네이션 컨트롤을 렌더링
    attachDynamicEventListeners(); // 동적 이벤트 리스너 재설정
}
// 초기화
function initialize() {
    attachStaticEventListeners();
    updateDisplay(getCurrentPageItems(), portfolioData.length);
}

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
          <a href="구글 로그인 링크">
          <img src="/static/img/google.png" alt="Google 로그인" style="margin-top: 5px;" height="55px" width="293px">
        </a>
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
    //회원 가입 db 연동
    async function signup() {
        const form = document.forms["signupForm"];
        await axios({
            method: "post",
            url: "/register",
            data: {
                email: form.email.value,
                nickname: form.username.value,
                password: form.password.value,
            },
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.result) {
                    alert(res.data.msg);
                    closeAuthModal();
                } else {
                    alert(res.data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //로그인 db연동
    async function login() {
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
            .then(async (res) => {
                const { result, msg, userId, nickname } = res.data; // 서버 응답 가정
                if (result) {
                    alert(msg); // 성공 메시지 알림
                    localStorage.setItem("userId", userId);
                    localStorage.setItem("nickname", nickname);
                    updateLoginState("true");
                    portfolioData = await fetchData("/main");
                    loadFavorites();
                    updateDisplay();
                    closeAuthModal();
                } else {
                    alert(msg); // 실패 메시지 알림
                }
            })
            .catch((error) => {
                console.error("로그인 중 오류 발생:", error);
            });
    }

    // 로그인 모달을 표시하는 함수

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

    document.addEventListener("DOMContentLoaded", function () {
        const editProfileSubmitButton = document.getElementById(
            "editProfileSubmitButton"
        );
        if (editProfileSubmitButton) {
            editProfileSubmitButton.addEventListener("click", function () {
                const nickname = document.querySelector(
                    "#editProfileForm input[name='nickname']"
                ).value;
                const password = document.querySelector(
                    "#editProfileForm input[name='password']"
                ).value;

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
                        document.getElementById(
                            "editProfileModal"
                        ).style.display = "none";
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
    const editProfileSubmitButton = document.getElementById(
        "editProfileSubmitButton"
    );
    const closeButton = document.querySelector(
        ".edit-profile-modal .close-button"
    );
    editProfileButton.addEventListener("click", function (event) {
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
    editProfileSubmitButton.addEventListener("click", function (event) {
        event.preventDefault(); // 버튼의 기본 동작 방지
        // 사용자 입력 값 가져오기
        const nickname = document.querySelector(
            "#editProfileForm input[name='nickname']"
        ).value;
        const password = document.querySelector(
            "#editProfileForm input[name='password']"
        ).value;
        // 유효성 검사
        if (!nickname || !password) {
            alert("닉네임과 비밀번호를 모두 입력하세요.");
            return;
        }

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
                document.getElementById("editProfileModal").style.display =
                    "none";
            })
            .catch((error) => {
                console.error("회원 정보 수정 중 오류 발생:", error);
                alert("회원 정보 수정 중 오류가 발생하였습니다.");
            });
    });

    //회원 탈퇴
    if (removeAccountButton) {
        removeAccountButton.addEventListener("click", function (event) {
            event.preventDefault(); // 버튼의 기본 동작 방지
            // 회원 탈퇴를 사용자에게 확인
            if (confirm("정말로 회원 탈퇴를 하시겠습니까?")) {
                // axios를 사용하여 회원 탈퇴 요청 전송
                axios({
                    method: "delete",
                    url: "/mypage",
                    headers: {
                        "Content-Type": "application/json",
                        // 필요한 경우 인증 정보를 헤더에 추가
                    },
                    data: {
                        // 필요한 경우, 회원 탈퇴에 필요한 데이터를 포함
                    },
                })
                    .then((response) => {
                        alert("회원 탈퇴가 성공적으로 처리되었습니다.");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("password");
                        localStorage.removeItem("email");

                        // 회원 탈퇴 후 처리 로직, 예: 로그아웃 처리 및 로그인 페이지로 리다이렉트
                        updateLoginState(false);
                    })
                    .catch((error) => {
                        console.error("회원 탈퇴 중 오류 발생:", error);
                        alert("회원 탈퇴 처리 중 오류가 발생했습니다.");
                    });
            }
        });
    }
});

//공고 등록 버튼
document.addEventListener("DOMContentLoaded", function () {
    // '공고등록' 버튼에 대한 참조를 찾습니다.
    const postJobButton = document.querySelector(".fab");
    if (!postJobButton) return; // postJobButton이 없는 경우 이후 로직을 수행하지 않음
    // 버튼 클릭 이벤트에 대한 리스너를 추가합니다.
    postJobButton.addEventListener("click", function () {
        if (isLoggedIn) {
            // 사용자가 로그인한 상태인 경우, detail 페이지로 이동합니다.
            window.location.href = "/jobs";
        } else {
            // 로그인하지 않은 상태에서 버튼을 클릭한 경우, 경고 메시지를 표시합니다.
            alert("로그인이 필요한 기능입니다.");
            // 여기서 로그인 페이지로 리다이렉트하거나 로그인 모달을 표시하는 등의 추가 동작을 구현할 수 있습니다.
        }
    });
});

// 현재 표시 중인 페이지가 최근 본 공고인지를 추적하는 상태 변수 추가
let viewingRecentPortfolios = false;
const viewButton = document.getElementById("viewRecentPortfolios");
// '내가 최근 본 공고' 버튼 클릭 이벤트 리스너
document
    .getElementById("viewRecentPortfolios")
    .addEventListener("click", function () {
        if (viewingRecentPortfolios) {
            // 이미 최근 본 공고를 보고 있다면, 전체 포트폴리오 목록을 렌더링
            viewingRecentPortfolios = false; // 상태 업데이트
            currentPage = 1; // 페이지를 첫 페이지로 리셋
            updateDisplay(); // 전체 공고 목록으로 돌아갈 때 페이지네이션 적용하여 업데이트
            this.classList.remove("active-background");
        } else {
            // 최근 본 공고 목록을 보여줌
            viewingRecentPortfolios = true; // 상태 업데이트
            const recentlyViewed =
                JSON.parse(localStorage.getItem("recentlyViewedPortfolios")) ||
                [];
            renderRecentlyViewedPortfolios(recentlyViewed);
            currentPage = 1; // 항상 첫 페이지로 설정
            renderPaginationControls(1); // 페이지네이션 컨트롤을 1페이지로 설정
            this.classList.add("active-background"); // 배경색 변경 클래스 추가
        }
    });

function handlePortfolioCardClick(portfolioId) {
    let recentlyViewed =
        JSON.parse(localStorage.getItem("recentlyViewedPortfolios")) || [];
    if (!recentlyViewed.includes(portfolioId)) {
        recentlyViewed.unshift(portfolioId); // 배열의 맨 앞에 추가
        recentlyViewed = recentlyViewed.slice(0, 12); // 최대 10개 항목만 유지
        localStorage.setItem(
            "recentlyViewedPortfolios",
            JSON.stringify(recentlyViewed)
        );
    }
}

function renderRecentlyViewedPortfolios(portfolioIds) {
    const filteredPortfolios = portfolioData
        .filter((item) => portfolioIds.includes(item.id.toString()))
        .slice(0, 12); // 최근 본 공고 중 처음 12개만 추출
    renderItems(filteredPortfolios); // 최근 본 공고를 화면에 표시
    attachCardClickEvent(); // 동적으로 추가된 요소에 이벤트 리스너 재부착
}

// 초기 로딩 시 이벤트 리스너 등록 및 기타 설정
document.addEventListener("DOMContentLoaded", () => {
    fetchData().then((data) => {
        portfolioData = data;
        attachCardClickEvent();
    });
    attachCardClickEvent();
});

//내가 쓴 공고 보기
let viewingMyJobs = false; // "내가 쓴 공고" 보기 상태를 추적하는 변수

const myJobsButton = document.getElementById("myJobsButton");
if (myJobsButton) {
    myJobsButton.addEventListener("click", async function () {
        if (!viewingMyJobs) {
            // "내가 쓴 공고"를 보여주는 경우
            portfolioData = await fetchMyJobs();
            currentPage = 1; // 페이지를 첫 번째로 리셋
            updateDisplay(); // 화면 업데이트
        } else {
            // "전체 공고"를 보여주는 경우
            fetchData("/main").then((data) => {
                portfolioData = data; // 전체 공고 데이터로 업데이트
                currentPage = 1; // 페이지를 첫 번째로 리셋
                updateDisplay(); // 화면 업데이트
            });
        }
        viewingMyJobs = !viewingMyJobs; // 상태 토글
    });
}

async function fetchMyJobs() {
    try {
        const res = await axios.get("/me/jobs", { withCredentials: true });
        console.log(res.data);
        return res.data.map((dataItem) => {
            // 가져온 데이터를 변환하여 반환
            const stacks = dataItem.stack; // 서버에서 스택 객체를 가져와 저장
            console.log("stacks", stacks);
            const techStack = Object.keys(stacks).filter((key) => stacks[key]); // true인 스택만 필터링하여 배열로 가져옴
            console.log("techStack", techStack);
            const tags = techStack.map((tag) => {
                // 첫 글자 대문자로 변환하여 태그 추가
                if (tag === "typescript") return "TypeScript";
                if (tag === "javascript") return "JavaScript";
                if (tag === "css") return "CSS";
                if (tag === "jsx") return "JSX";
                if (tag === "html") return "HTML";
                return tag.charAt(0).toUpperCase() + tag.slice(1);
            });
            const finalTags = tags.length > 0 ? tags : ["없음"]; // 스택이 없으면 "없음" 태그를 사용
            console.log("finalTags", finalTags);
            return {
                id: dataItem.jobs_id,
                title: dataItem.company_name,
                date: dataItem.created_at,
                tags: finalTags, // 스택이 없으면 "없음" 태그로 설정
                imageUrl: dataItem.img_path,
                favoriteCount: dataItem.cnt_likes,
                isFavorite: false, // 초기 즐겨찾기 상태는 false로 설정
            };
        });
    } catch (error) {
        console.error("내가 쓴 공고를 가져오는 중 오류 발생:", error);
    }
}

function displayMyJobs(jobs) {
    const container = document.getElementById("portfolioItems"); // 공고를 표시할 컨테이너의 ID
    container.innerHTML = ""; // 컨테이너 초기화

    jobs.forEach((job) => {
        const jobElement = document.createElement("div");
        jobElement.classList.add("portfolioCard");
        jobElement.innerHTML = `
            <div class="favorite-container">
                <span class="material-symbols-outlined favorite">favorite_border</span>
            </div>
            <img src="${job.imageUrl}" alt="${job.title}">
            <h3>${job.title}</h3>
            <p>${job.date}</p>
            <div class="tags-container">${job.tags
                .map((tag) => `<span class="tag-button">${tag}</span>`)
                .join(" ")}</div>
        `;
        container.appendChild(jobElement);
    });
}
