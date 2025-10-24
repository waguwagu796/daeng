import React, { useState } from 'react';

const PetTravelGuide = () => {
  const [activeTab, setActiveTab] = useState('고속버스/시외버스');

  const tabs = ['고속버스/시외버스', '기차', '비행기', '펫택시'];

  const transportInfo = [
    {
      title: '고속버스·시외버스',
      description: '전용 이동장비에 넣은 소형견에 한해 대부분 탑승 허용',
      detail: '여객자동차운수사업법, 운송약관',
      image: '/images/bus.jpg'
    }
  ];

  const trainInfo = {
    title: '기차',
    description: '전용 이동장비에 넣은 소형견에 한해 대부분 탑승 허용',
    law: '철도안전법',
    image: '/images/train.jpg'
  };

  const airplaneInfo = {
    title: '비행기',
    description: '생후 8주 지난 개, 고양이, 새 탑승 가능 케이지 포함 5-7kg 이하 기내 반입. 그 이상은 위탁 수하물',
    law: '항공사업법, 운송약관',
    image: '/images/airplane.jpg'
  };

  const petTaxiInfo = {
    title: '펫택시',
    description: '반려동물 전용 펫택시는 제주를 제외한 서울 및 수도권 지역에서 거리 관계 없이 이용이 가능합니다. 택시의 경우 기사님에 따라 탑승 거부를 하는 경우도 있으나 펫택시에 비해 가격이 저렴하고 사고가 났을 경우 보험처리가 수월합니다. (현재 펫택시는 업체마다 조금씩 차이가 있음) 펫택시는 대형견도 탑승이 가능하며, 강아지가 멀미하거나 안정이 필요할 경우 케이지에 넣지 않고 주인이 안고 탑승할 수 있습니다. 가격과 보험, 반려동물의 성향을 잘 고려하여 택시를 선택해보세요.',
    image: '/images/pet-taxi.jpg'
  };

  const guidelines = [
    { text: '반려동물 여행 시 필수품', isTitle: true },
    { text: '반려동물 여행시 유의사항', isTitle: true },
    { text: '입마개 · 목줄 및 기타 안전장치', isTitle: false },
    { text: '반려견의 이름 또는 연락처 기재된 목걸이 등', isTitle: false },
    { text: '케이지 내 배설물 처리 준비물', isTitle: false },
    { text: '애완동물 전용 이동장치·케이지 등', isTitle: false },
    { text: '대중교통 이용시 반려견 안전장치 미착용 · 동반 승차 불가', isTitle: false },
    { text: '케이지에는 "강아지가 타고 있습니다" 표시', isTitle: false }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      padding: '4rem 1rem 1rem 1rem',
      textAlign: 'center'
    },
   
    headerTitle: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#2f3640',
      marginBottom: '1rem',
      lineHeight: 1.3
    },
    headerImage: {
      marginTop: '2rem',
      maxWidth: '600px',
      width: '100%',
      height: 'auto',
      margin: '2rem auto 0',
      display: 'block',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    infoText: {
      maxWidth: '64rem',
      margin: '0 auto',
      padding: '2rem 1rem',
      textAlign: 'center',
      color: '#374151'
    },
    tabsContainer: {
      maxWidth: '64rem',
      margin: '0 auto',
      padding: '0 1rem'
    },
    tabsWrapper: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    tabsBar: {
      display: 'flex',
      borderBottom: '1px solid #e5e7eb'
    },
    tabButton: {
      flex: 1,
      padding: '1rem 1.5rem',
      textAlign: 'center',
      fontWeight: 500,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      transition: 'all 0.2s'
    },
    tabButtonActive: {
      flex: 1,
      padding: '1rem 1.5rem',
      textAlign: 'center',
      fontWeight: 500,
      backgroundColor: '#ff7043',
      color: 'white',
      border: 'none',
      borderBottom: '2px solid #ff7043',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    tabContent: {
      padding: '2rem'
    },
    transportCard: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'flex-start'
    },
    transportImage: {
      width: '320px',
      height: '208px',
      objectFit: 'cover',
      borderRadius: '0.5rem',
      flexShrink: 0
    },
    transportTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#ff7043',
      marginBottom: '0.75rem'
    },
    transportDesc: {
      color: '#374151',
      marginBottom: '0.5rem'
    },
    transportDetail: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    transportLink: {
      display: 'inline-block',
      marginTop: '0.75rem',
      color: '#ff7043',
      fontSize: '0.875rem',
      textDecoration: 'none'
    },
    imageCredit: {
      textAlign: 'right',
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '1rem'
    },
    noticeSection: {
      maxWidth: '64rem',
      margin: '2rem auto 3rem',
      padding: '0 1rem'
    },
    noticeWrapper: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '2rem'
    },
    noticeTitle: {
      textAlign: 'center',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid #e5e7eb'
    },
    noticeContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    noticeItemTitle: {
      fontWeight: 'bold',
      fontSize: '1.125rem',
      color: '#ff7043',
      marginBottom: '0.75rem'
    },
    noticeItemText: {
      color: '#374151',
      paddingLeft: '1rem',
      marginBottom: '0.5rem'
    },
    noticeFooter: {
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e5e7eb',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    guidelines: {
      maxWidth: '64rem',
      margin: '0 auto 3rem',
      padding: '0 1rem'
    },
    guidelinesWrapper: {
      backgroundColor: '#fff3e0',
      borderRadius: '0.5rem',
      border: '1px solid #ff7043',
      padding: '1.5rem'
    },
    guidelinesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.5rem'
    },
    guidelineTitle: {
      fontWeight: 'bold',
      color: '#ff7043',
      fontSize: '1.125rem'
    },
    guidelineContent: {
      color: '#374151',
      paddingLeft: '1rem'
    },
    emptyMessage: {
      textAlign: 'center',
      padding: '2rem',
      color: '#6b7280'
    }
  };

  return (
    <div style={styles.container}>
      {/* 헤더 섹션 */}
      <div style={styles.header}>
        <div style={{maxWidth: '64rem', margin: '0 auto'}}>
          
          <h1 style={styles.headerTitle}>
            반려동물 교통정보 가이드
          </h1>
          <p className="weather-subtitle">반려동물 동반 여행 시, 편리하게 이동하세요</p>
        </div>
      </div>
      <div style={styles.infoText}>
        <p>
          <strong>애견동반 여행 시 즐기는 대중교통 이용방법!</strong><br/>
          <br />
          케이지에 넣어 이동하거나 소형·중형견 경우 입마개를 착용한 뒤 목줄로 끌게 하거나 안아서 이동해야 합니다. 
          단, 애견대형견은 이동제한 대상이므로 애완견동반에 대해 버스 출발 전에 반드시 확인하세요.
        </p>
      </div>

      {/* 탭 메뉴 */}
      <div style={styles.tabsContainer}>
        <div style={styles.tabsWrapper}>
          <div style={styles.tabsBar}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={activeTab === tab ? styles.tabButtonActive : styles.tabButton}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 탭 컨텐츠 */}
          <div style={styles.tabContent}>
            {activeTab === '고속버스/시외버스' && (
              <div>
                {transportInfo.map((info, index) => (
                  <div key={index} style={styles.transportCard}>
                    <img 
                      src={info.image} 
                      alt={info.title}
                      style={styles.transportImage}
                    />
                    <div style={{flex: 1}}>
                      <h3 style={styles.transportTitle}>
                        ▶ {info.title}
                      </h3>
                      <p style={styles.transportDesc}>{info.description}</p>
                      <p style={styles.transportDetail}>{info.detail}</p>
                    </div>
                  </div>
                ))}
                
              </div>
            )}

            {activeTab === '기차' && (
              <div>
                <div style={styles.transportCard}>
                  <img 
                    src={trainInfo.image} 
                    alt={trainInfo.title}
                    style={styles.transportImage}
                  />
                  <div style={{flex: 1}}>
                    <h3 style={styles.transportTitle}>
                      ▶ {trainInfo.title}
                    </h3>
                    <p style={styles.transportDesc}>{trainInfo.description}</p>
                    <p style={styles.transportDetail}>{trainInfo.law}</p>
                  </div>
                </div>
                
              </div>
            )}

            {activeTab === '비행기' && (
              <div>
                <div style={styles.transportCard}>
                  <img 
                    src={airplaneInfo.image} 
                    alt={airplaneInfo.title}
                    style={styles.transportImage}
                  />
                  <div style={{flex: 1}}>
                    <h3 style={styles.transportTitle}>
                      ▶ {airplaneInfo.title}
                    </h3>
                    <p style={styles.transportDesc}>{airplaneInfo.description}</p>
                    <p style={styles.transportDetail}>{airplaneInfo.law}</p>
                  </div>
                </div>
                
              </div>
            )}

            {activeTab === '펫택시' && (
              <div>
                <div style={styles.transportCard}>
                  <img 
                    src={petTaxiInfo.image} 
                    alt={petTaxiInfo.title}
                    style={styles.transportImage}
                  />
                  <div style={{flex: 1}}>
                    <h3 style={styles.transportTitle}>
                      ▶ {petTaxiInfo.title}
                    </h3>
                    <p style={styles.transportDesc}>{petTaxiInfo.description}</p>
                  </div>
                </div>
                
              </div>
            )}
          </div>
        </div>
      </div>

      

      {/* 가이드라인 박스 */}
      <div style={styles.guidelines}>
        <div style={styles.guidelinesWrapper}>
          <div style={styles.guidelinesGrid}>
            {guidelines.map((guide, index) => (
              <div 
                key={index}
                style={guide.isTitle ? styles.guidelineTitle : styles.guidelineContent}
              >
                {guide.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetTravelGuide;