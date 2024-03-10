function darkModeToggle() {
    // <body> 요소에 dark-mode 클래스를 추가/제거하여 다크 모드 토글
    document.body.classList.toggle("dark-mode");
}

// 페이지 로드 시 localStorage에서 다크 모드 상태를 확인하고 적용
document.addEventListener("DOMContentLoaded", function () {
    const darkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";

    // localStorage에 저장된 값에 따라 다크 모드 클래스를 추가/제거
    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
    }
});

function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle("dark-mode");

    // 다크 모드 설정 로컬 스토리지에 저장
    localStorage.setItem("darkModeEnabled", isDarkMode);
}

// 페이지 로드 시 로컬 스토리지에서 다크 모드 상태를 확인하고 적용
document.addEventListener("DOMContentLoaded", function () {
    const darkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";

    // 로컬 스토리지에 저장된 값에 따라 다크 모드 클래스를 추가/제거
    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
    }
});

// 페이지를 벗어날 때 현재 다크 모드 상태를 로컬 스토리지에 저장
window.addEventListener("beforeunload", function () {
    const isDarkModeEnabled = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkModeEnabled", isDarkModeEnabled);
});
