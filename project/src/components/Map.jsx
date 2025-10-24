import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Kakao Map API 스크립트 로드
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAP_API_KEY`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        initializeMap();
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initializeMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심
      level: 8
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);

    // 택시 관련 지역 마커 추가
    addTaxiRegions(kakaoMap);
  };

  const addTaxiRegions = (kakaoMap) => {
    // 택시 이용이 많은 주요 지역들
    const taxiRegions = [
      {
        name: '강남역',
        position: new window.kakao.maps.LatLng(37.4979, 127.0276),
        path: '/region/gangnam',
        description: '강남역 택시 승하차 지역'
      },
      {
        name: '홍대입구역',
        position: new window.kakao.maps.LatLng(37.5563, 126.9226),
        path: '/region/hongdae',
        description: '홍대입구역 택시 승하차 지역'
      },
      {
        name: '명동',
        position: new window.kakao.maps.LatLng(37.5636, 126.9826),
        path: '/region/myeongdong',
        description: '명동 택시 승하차 지역'
      },
      {
        name: '이태원',
        position: new window.kakao.maps.LatLng(37.5347, 126.9947),
        path: '/region/itaewon',
        description: '이태원 택시 승하차 지역'
      },
      {
        name: '잠실역',
        position: new window.kakao.maps.LatLng(37.5133, 127.1002),
        path: '/region/jamsil',
        description: '잠실역 택시 승하차 지역'
      },
      {
        name: '신촌역',
        position: new window.kakao.maps.LatLng(37.5551, 126.9368),
        path: '/region/sinchon',
        description: '신촌역 택시 승하차 지역'
      }
    ];

    taxiRegions.forEach(region => {
      // 택시 아이콘 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: region.position,
        title: region.name
      });

      marker.setMap(kakaoMap);

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', () => {
        navigate(region.path);
      });

      // 커스텀 오버레이 생성
      const overlay = new window.kakao.maps.CustomOverlay({
        position: region.position,
        content: `<div style="
          background: rgba(255, 193, 7, 0.9);
          color: #333;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: bold;
          white-space: nowrap;
          border: 2px solid #ffc107;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        ">🚕 ${region.name}</div>`,
        yAnchor: 1
      });

      overlay.setMap(kakaoMap);
    });
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'white',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        zIndex: 1000,
        maxWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>🚕 택시 이용 지역</h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          지도에서 택시 이용이 많은 지역을 클릭하면 해당 지역의 상세 정보를 볼 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Map;
