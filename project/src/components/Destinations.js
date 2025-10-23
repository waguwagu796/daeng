import React, { useEffect, useState } from 'react';
import './Destinations.css';
import axios from 'axios';

const Destinations = () => {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [data,setData] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState('')

    useEffect(()=>{
        
        //newsapi.org의 개인 api
        const API_KEY = 'e4fb0451-f64f-46f9-8f8f-c4267592f404'

        // const query = category === 'all' ? '' : `&category=${category}` //GET방식으로 category받기

        const url = `https://api.kcisa.kr/openapi/API_TOU_050/request?serviceKey=${API_KEY}`

        axios.get(url, {responseType: 'text'})
        .then(res=>{
            setData(res.data.response?.body?.items?.item || [])  //다른 데이터는 필요없고 articles만 필요하기 때문에 articles만 읽어올 수 있도록 설정해줌
            //setIsLoading(false)
            setError('')
        })
        .catch(error => {
            setData([])
            //setIsLoading(true)
            setError('헤드라인을 읽어올 수 없습니다.')
        })

    },[])

    const address = ['서울', '대전', '대구', '부산', '광주', '울산', '인천', '경기도', '강원도', '충청북도', '충청남도', '경상북도', '경상남도', '전라북도', '전라남도', '제주도'];
    const categories = ['반려의료', '반려동반여행', '반려동물 서비스', '반려동물식당카페'];

    // 실제로는 API로 불러올 데이터 예시
    const destinations = [
        { address: '서울', category: '명소', title: '남산타워', desc: '서울의 대표 전망 명소', img: '/images/namsan.jpg' },
        { address: '부산', category: '맛집', title: '광안리 해변 카페거리', desc: '카페와 바다가 어우러진 명소', img: '/images/gwangalli.jpg' },
        { address: '강원도', category: '자연', title: '설악산', desc: '사계절이 아름다운 명산', img: '/images/seoraksan.jpg' },
        { address: '제주도', category: '축제', title: '제주 들불축제', desc: '제주의 전통 축제를 체험할 수 있는 이벤트', img: '/images/jeju_fire.jpg' },
    ];

    const destinations1 = [
        { address: '경기도 고양시 덕양구 동세로 19', category1: '반려의료', category2: '동물약국', title: '1004 약국', description: '운영시간 : 월~금 09:00~18:00 | 휴무일 : 매주 토, 일, 법정공휴일 | 주차가능 | 반려동물 동반가능 | 반려동물 제한사항 : 없음', tel:'02-381-5052', img: '/images/namsan.jpg' },
        { address: '부산광역시 남구 유엔평화로 6', category1: '반려동반여행', category2: '문예회관', title: '부산문화회관', description: '운영시간 : 매일 10:00~20:00 | 휴무일 : 전시공연에 따라 변동 | 주차가능 | 반려동물 동반불가', tel:'051-607-6000', img: '/images/gwangalli.jpg' },
        { address: '경상남도 창원시 마산합포구 3.15대로 437', category1: '반려의료', category2: '동물병원', title: '부산동물병원', description: '운영시간 : 월~금 09:30~19:00, 토 09:30~13:00, 법정공휴일 09:30~13:00 | 휴무일 : 매주 일요일 | 주차 불가 | 반려동물 동반가능 | 반려동물 제한사항 : 제한사항 없음', tel:'055-243-8104', img: '/images/seoraksan.jpg' },
        { address: '부산광역시 연제구 거제대로 278', category1: '반려의료', category2: '동물병원', title: '부산동물메디컬센터', description: '운영시간 : 월~금 9:00~19:00, 토~일, 법정공휴일 9:00~18:00 | 휴무일 : 연중무휴 | 주차가능 | 반려동물 동반가능 | 반려동물 제한사항 : 제한사항 없음', tel:'051-868-7591', img: '/images/jeju_fire.jpg' },
    ];

    const processedDestinations = data.map(item => {
        const match = item.address.match(/^[가-힣]+(?:특별시|광역시|도)/);
        const region = match ? match[0] : '기타';
        return { ...item, region };
    });

    const filtered = processedDestinations.filter(
        item =>
        (!selectedAddress || item.region.includes(selectedAddress)) &&
        (!selectedCategory || item.category1 === selectedCategory)
    );

    return (
        <div className="destinations-page">
        <div className="destinations-header">
            <h1>여행지 추천</h1>
            <p>지역과 카테고리를 선택하여 여행지를 찾아보세요.</p>
        </div>

        {/* 지역 선택 */}
        <div className="selection-section">
            <h2>지역 선택</h2>
            <div className="button-group">
            {address.map((addr) => (
                <button
                key={addr}
                className={`select-btn ${selectedAddress === addr ? 'active' : ''}`}
                onClick={() => setSelectedAddress(addr)}
                >
                {addr}
                </button>
            ))}
            </div>
        </div>

        {/* 카테고리 선택 */}
        {selectedAddress && (
            <div className="selection-section">
            <h2>카테고리 선택</h2>
            <div className="button-group">
                {categories.map((category) => (
                <button
                    key={category}
                    className={`select-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
                ))}
            </div>
            </div>
        )}

        {/* 추천 결과 */}
        {selectedCategory && (
            <div className="recommend-section">
            <h2>추천 여행지</h2>
            {filtered.length === 0 ? (
                <p className="no-result">해당 조건의 추천지가 없습니다.</p>
            ) : (
                <div className="destination-list">
                {filtered.map((destination, id) => (
                    <div className="destination-card" key={id}>
                    <img src={destination.img} alt={destination.name} className="destination-img" />
                    <div className="destination-info">
                        <h3>{destination.title}</h3>
                        <p>{destination.category2}</p>
                        <p>{destination.address}</p>
                        <p>{destination.tel}</p>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        )}
        </div>
    );
    };

    export default Destinations;
