import React, { useEffect } from "react";

const KakaoMap = ({ latitude, longitude, title }) => {
  useEffect(() => {
    // Kakao 지도 스크립트가 로드되어 있는지 체크
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps SDK 로드되지 않음");
      return;
    }

    // 지도 초기화
    const container = document.getElementById("kakao-map");
    if (!container) {
      console.error("지도 컨테이너가 없음");
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    // 마커 생성
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      map: map,
      title: title,
    });

  // 정보창 생성
    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">${title}</div>`,
    });

    // 마커 클릭 시 정보창 열기
    window.kakao.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

  }, [latitude, longitude, title]);

  return <div id="kakao-map" className="map-box">지도 로딩 중...</div>;
};

export default KakaoMap;
