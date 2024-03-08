var mapContainer = document.getElementById("map"); // 지도를 표시할 div
var mapOption = {
    center: new daum.maps.LatLng(37.537187, 127.005476), // 기본 중심좌표
    level: 1, // 지도의 확대 레벨
};

// 지도를 미리 생성
var map = new daum.maps.Map(mapContainer, mapOption);
// 주소-좌표 변환 객체를 생성
var geocoder = new daum.maps.services.Geocoder();
// 마커를 미리 생성
var marker = new daum.maps.Marker({
    position: new daum.maps.LatLng(37.537187, 127.005476),
    map: map,
});

// 페이지 로딩 시 현위치로 지도의 중심을 이동하고 주소 입력 필드에 기본값 설정
getCurrentLocation();

// 주소 검색 함수
function sample5_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            var addr = data.address; // 최종 주소 변수

            // 주소 정보를 해당 필드에 넣는다.
            document.getElementById("sample5_address").value = addr;
            // 주소로 상세 정보를 검색
            geocoder.addressSearch(data.address, function (results, status) {
                // 정상적으로 검색이 완료됐으면
                if (status === daum.maps.services.Status.OK) {
                    var result = results[0]; //첫번째 결과의 값을 활용

                    // 해당 주소에 대한 좌표를 받아서
                    var coords = new daum.maps.LatLng(result.y, result.x);
                    // 지도 중심을 변경한다.
                    map.setCenter(coords);
                    // 마커를 결과값으로 받은 위치로 옮긴다.
                    marker.setPosition(coords);
                }
            });
        },
    }).open();
}

// 현위치 찾기 함수
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude; // 위도
            var lng = position.coords.longitude; // 경도

            var currentPos = new daum.maps.LatLng(lat, lng);
            map.setCenter(currentPos);
            marker.setPosition(currentPos);

            // 주소로 변환하여 입력 필드에 넣기
            geocoder.coord2Address(lng, lat, function (result, status) {
                if (status === daum.maps.services.Status.OK) {
                    var address = result[0].address.address_name;
                    document.getElementById("sample5_address").value = address;
                }
            });
        });
    } else {
        alert("현위치를 찾을 수 없습니다.");
    }
}
