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

// 데이터 로딩 및 처리
async function fetchData(url) {
    try {
        const res = await axios.get(url);
        return res.data.map(dataItem => ({
            id: dataItem.jobs_id,
            title: dataItem.company_name,
            date: dataItem.created_at,
            tags: ["React", "JavaScript"], // 예시로 React를 기본값으로 설정
            imageUrl: dataItem.img_path,
            favoriteCount: dataItem.cnt_likes,
            isFavorite: false, // 초기 즐겨찾기 상태는 false로 설정
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
let portfolioData = [];
let currentPage = 1;
const itemsPerPage = 12;
let isFavoriteMode = false; // '관심 공고' 모드를 추적하는 상태





// 동적 이벤트 리스너 설정 (즐겨찾기 버튼 등)
function attachDynamicEventListeners() {
    attachFavoriteEventListeners();
    attachCardClickEvent();
}
let isLoggedIn = false;
document.addEventListener("DOMContentLoaded", async () => {
    portfolioData = await fetchData("/main");
    initialize();
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
    return portfolioData.filter(item => {
        const matchesSearchText = item.title.toLowerCase().includes(currentSearchText);
        const matchesFavorite = !isFavoriteMode || item.isFavorite;
        const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => item.tags.includes(tag));
        return matchesSearchText && matchesFavorite && matchesTags;
    });
}


// 정적 이벤트 리스너 설정 (검색 입력, 관심 공고 버튼 등)
function attachStaticEventListeners() {
    document.getElementById("searchInput").addEventListener("input", handleSearchInput);
    document.querySelector(".interest-button").addEventListener("click", toggleFavoriteModeAndView);
    // 태그 필터링 버튼 이벤트 리스너 등록 등
}

// 아이템 렌더링
function renderItems(items) {
    const container = document.getElementById("portfolioItems");
    container.innerHTML = items.map(item => `
        <div class="portfolioCard" data-item-id="${item.id}">
            <div class="favorite-container" onclick="event.stopPropagation(); toggleFavoriteLocal('${item.id}')">
                <span class="material-symbols-outlined favorite" style="color: ${item.isFavorite ? 'red' : 'inherit'};">${item.isFavorite ? 'favorite' : 'favorite_border'}</span>
                <span class="favorite-count">${item.favoriteCount}</span>
            </div>
            <img src="${item.imageUrl}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.date}</p>
            <div class="tags-container">${item.tags.map(tag => `<span class="tag-button">${tag}</span>`).join(' ')}</div>
        </div>
    `).join('');
}

// 페이지네이션 컨트롤
function renderPaginationControls(totalItems) {
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= pageCount; i++) {
        paginationContainer.innerHTML += `<button class="${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
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
    const item = portfolioData.find(item => item.id === itemId);
    if (item) {
        // 즐겨찾기 상태를 토글
        const newFavoriteStatus = !item.isFavorite;
        
        // 즐겨찾기 추가 또는 제거에 따른 엔드포인트 선택
        const url = newFavoriteStatus ? '/like' : '/unlike';

        axios.patch(url, { jobsId: itemId })
            .then(response => {
                // 서버 요청 성공 후 로컬 상태 업데이트
                item.isFavorite = newFavoriteStatus;
                item.favoriteCount += newFavoriteStatus ? 1 : -1;
                updateDisplay(getCurrentPageItems(), getFilteredData().length);
                console.log(response.data);
                alert(`관심 등록 ${newFavoriteStatus ? '추가' : '삭제'}되었습니다.`);
            })
            .catch(error => {
                console.error("관심 등록 변경 중 오류 발생:", error);
                alert("관심 등록 변경 중 오류가 발생했습니다.");
            });
    }
}


// 이벤트 리스너 동적 추가
function attachFavoriteEventListeners() {
    document.querySelectorAll('.favorite-container').forEach(container => {
        container.onclick = (event) => {
            event.stopPropagation(); // 이벤트 전파 중지
            const itemId = container.parentElement.getAttribute('data-item-id');
            toggleFavoriteLocal(itemId);
        };
    });
}


function attachCardClickEvent() {
    document.querySelectorAll('.portfolioCard').forEach(card => {
        card.addEventListener('click', () => {
            const itemId = card.getAttribute('data-item-id');
            window.location.href = `/jobs/${itemId}`;
        });
    });
}

// 검색 처리
let currentSearchText = '';
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
    document.querySelectorAll('.button-group button').forEach(button => {
        const tag = button.textContent.trim();
        if (selectedTags.includes(tag)) {
            button.classList.add('selected'); // 'selected' 클래스 추가
        } else {
            button.classList.remove('selected'); // 'selected' 클래스 제거
        }
    });
}





// 즐겨찾기 모드 토글 및 뷰 업데이트
function toggleFavoriteModeAndView() {

    
    isFavoriteMode = !isFavoriteMode;
   
    const interestButton = document.querySelector('.interest-button');
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

function updateDisplay() {
    const filteredData = getFilteredData(); // 현재 상태를 기반으로 데이터 필터링
    const itemsToShow = getCurrentPageItems(filteredData); // 필터링된 아이템을 기반으로 현재 페이지 아이템 결정
    renderItems(itemsToShow);
    renderPaginationControls(filteredData.length); // 필터링된 아이템의 총 수를 기반으로 페이지네이션 컨트롤 렌더링
    attachDynamicEventListeners(); // 동적 이벤트 리스너 재설정
}

// 정적 이벤트 리스너 설정
function attachStaticEventListeners() {
    document.getElementById('searchInput').addEventListener('input', handleSearchInput);
    document.querySelector('.interest-button').addEventListener('click', toggleFavoriteModeAndView);
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

document.addEventListener('DOMContentLoaded', async () => {
    portfolioData = await fetchData('/main');
    initialize();
});


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
        
            dropdown.style.display = "none"; // 드롭다운 버튼 보이게 설정
            interestButton.style.display = "none"; // 관심 공고 버튼 보이게 설정
          
           
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
                const { result, msg} = res.data; // 가정: 서버에서 {result: true/false, msg: '메시지'} 형태로 응답
                if (result) {
                    alert(msg); // 성공 메시지 알림
                    closeAuthModal(); // 모달 닫기 함수 호출
                    updateLoginState(true);
                    isLoggedIn = true;
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
                    isLoggedIn = false;
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
    
    if (!postJobButton) return; // postJobButton이 없는 경우 이후 로직을 수행하지 않음

    // 버튼 클릭 이벤트에 대한 리스너를 추가합니다.
    postJobButton.addEventListener("click", function () {
        if (isLoggedIn) {
            // 사용자가 로그인한 상태인 경우, detail 페이지로 이동합니다.
            window.location.href = "/detail";
        } else {
            // 로그인하지 않은 상태에서 버튼을 클릭한 경우, 경고 메시지를 표시합니다.
            alert("로그인이 필요한 기능입니다.");
            // 여기서 로그인 페이지로 리다이렉트하거나 로그인 모달을 표시하는 등의 추가 동작을 구현할 수 있습니다.
        }
    });
});

