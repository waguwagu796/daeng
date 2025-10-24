import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RegionDetail = () => {
  const { regionName } = useParams();
  const navigate = useNavigate();

  // 택시 관련 지역 정보 데이터
  const regionData = {
    gangnam: {
      name: '강남역',
      description: '강남역은 서울의 주요 상업지구로 택시 이용이 매우 활발한 지역입니다.',
      taxiInfo: {
        peakHours: '오후 6시-8시, 오후 10시-12시',
        averageWait: '3-5분',
        fare: '기본요금 3,800원',
        availability: '매우 높음'
      },
      attractions: ['강남역', '코엑스', '롯데월드타워', '한강공원'],
      tips: ['출퇴근 시간대에는 대기시간이 길어질 수 있습니다.', '주말 밤에는 택시 호출이 어려울 수 있습니다.']
    },
    hongdae: {
      name: '홍대입구역',
      description: '홍대는 젊은이들의 문화 중심지로 밤늦게까지 택시 이용이 활발합니다.',
      taxiInfo: {
        peakHours: '오후 8시-새벽 2시',
        averageWait: '5-8분',
        fare: '기본요금 3,800원',
        availability: '높음'
      },
      attractions: ['홍대입구역', '클럽가', '상수동', '합정역'],
      tips: ['주말 밤에는 택시 대기시간이 길어집니다.', '술자리 후 택시 호출 시 주의하세요.']
    },
    myeongdong: {
      name: '명동',
      description: '명동은 관광지로 외국인 관광객들이 많이 이용하는 택시 지역입니다.',
      taxiInfo: {
        peakHours: '오후 2시-6시, 오후 8시-10시',
        averageWait: '2-4분',
        fare: '기본요금 3,800원',
        availability: '매우 높음'
      },
      attractions: ['명동역', '명동성당', '남산타워', '을지로'],
      tips: ['관광지라 택시 이용이 편리합니다.', '외국인 관광객들이 많이 이용합니다.']
    },
    itaewon: {
      name: '이태원',
      description: '이태원은 외국인들이 많이 거주하는 지역으로 24시간 택시 이용이 가능합니다.',
      taxiInfo: {
        peakHours: '오후 7시-새벽 3시',
        averageWait: '4-6분',
        fare: '기본요금 3,800원',
        availability: '높음'
      },
      attractions: ['이태원역', '한강공원', '용산공원', '국립중앙박물관'],
      tips: ['외국인들이 많이 이용하는 지역입니다.', '밤늦게까지 택시 이용이 가능합니다.']
    },
    jamsil: {
      name: '잠실역',
      description: '잠실은 주거지역과 상업지구가 함께 있는 지역으로 택시 이용이 활발합니다.',
      taxiInfo: {
        peakHours: '오후 6시-8시, 오후 10시-12시',
        averageWait: '3-5분',
        fare: '기본요금 3,800원',
        availability: '높음'
      },
      attractions: ['잠실역', '롯데월드', '석촌호수', '올림픽공원'],
      tips: ['주말에는 롯데월드 방문객으로 인해 택시 이용이 많습니다.', '석촌호수 주변에서 택시 호출이 편리합니다.']
    },
    sinchon: {
      name: '신촌역',
      description: '신촌은 대학가로 젊은이들이 많이 이용하는 택시 지역입니다.',
      taxiInfo: {
        peakHours: '오후 6시-10시, 새벽 1시-3시',
        averageWait: '4-7분',
        fare: '기본요금 3,800원',
        availability: '보통'
      },
      attractions: ['신촌역', '연세대학교', '이화여자대학교', '홍익대학교'],
      tips: ['대학가라 학생들이 많이 이용합니다.', '시험기간에는 택시 이용이 줄어듭니다.']
    }
  };

  const currentRegion = regionData[regionName];

  if (!currentRegion) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>지역을 찾을 수 없습니다</h2>
        <button 
          onClick={() => navigate('/map')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          지도로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/map')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← 지도로 돌아가기
      </button>

      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          🚕 {currentRegion.name} 택시 정보
        </h1>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#555', marginBottom: '10px' }}>지역 소개</h3>
          <p style={{ lineHeight: '1.6', color: '#666' }}>
            {currentRegion.description}
          </p>
        </div>

        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '10px', 
          marginBottom: '30px' 
        }}>
          <h3 style={{ color: '#555', marginBottom: '15px' }}>🚕 택시 이용 정보</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <strong>피크 시간:</strong>
              <p style={{ margin: '5px 0', color: '#666' }}>{currentRegion.taxiInfo.peakHours}</p>
            </div>
            <div>
              <strong>평균 대기시간:</strong>
              <p style={{ margin: '5px 0', color: '#666' }}>{currentRegion.taxiInfo.averageWait}</p>
            </div>
            <div>
              <strong>기본 요금:</strong>
              <p style={{ margin: '5px 0', color: '#666' }}>{currentRegion.taxiInfo.fare}</p>
            </div>
            <div>
              <strong>택시 이용 가능성:</strong>
              <p style={{ margin: '5px 0', color: '#666' }}>{currentRegion.taxiInfo.availability}</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#555', marginBottom: '15px' }}>📍 주요 관광지</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {currentRegion.attractions.map((attraction, index) => (
              <span 
                key={index}
                style={{
                  background: '#e9ecef',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  color: '#495057'
                }}
              >
                {attraction}
              </span>
            ))}
          </div>
        </div>

        <div style={{ 
          background: '#fff3cd', 
          padding: '20px', 
          borderRadius: '10px',
          border: '1px solid #ffeaa7'
        }}>
          <h3 style={{ color: '#856404', marginBottom: '15px' }}>💡 택시 이용 팁</h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {currentRegion.tips.map((tip, index) => (
              <li key={index} style={{ marginBottom: '8px', color: '#856404' }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegionDetail;
