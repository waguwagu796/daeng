import React, { useEffect, useState } from 'react';
import './Destinations.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Destinations = () => {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;



    // 상세페이지 연결
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true);
        
        const API_KEY = 'e4fb0451-f64f-46f9-8f8f-c4267592f404'
        const url = `https://api.kcisa.kr/openapi/API_TOU_050/request?serviceKey=${API_KEY}&numOfRows=1000&pageNo=1`

        console.log('API 호출 시작:', url);

        axios.get(url)  // JSON이므로 responseType 지정 불필요
            .then(res => {
                // console.log('API 응답:', res.data);
                
                // JSON 구조에 맞게 데이터 추출
                const items = res.data?.response?.body?.items?.item || [];
                // console.log('추출된 데이터:', items);
                // console.log('데이터 개수:', items.length);

                // if (items.length > 0) {
                //     console.log('첫 번째 아이템 샘플:', items[0]);
                // }
                
                setData(items);
                setIsLoading(false);
                setError('');
            })
            .catch(error => {
                console.error('API 오류 상세:', error);
                console.error('에러 메시지:', error.message);
                
                if (error.response) {
                    console.error('응답 상태:', error.response.status);
                    console.error('응답 데이터:', error.response.data);
                }
                
                setData([]);
                setIsLoading(false);
                setError(`데이터를 불러올 수 없습니다: ${error.message}`);
            })

    }, [])

    const address = ['서울', '대전', '대구', '부산', '광주', '울산', '인천', '세종', '경기도', '강원도', '충청북도', '충청남도', '경상북도', '경상남도', '전라북도', '전라남도', '제주'];
    const categories = ['반려의료', '반려동반여행', '반려동물 서비스', '반려동물식당카페'];

    const processedDestinations = data.map(item => {
        const addressWithoutPostal = item.address?.replace(/^\(\d+\)\s*/, '');
        const match = addressWithoutPostal?.match(/^[가-힣]+(?:특별시|광역시|특별자치시|도|특별자치도)/);
        const region = match ? match[0] : '기타';
        return { ...item, region };
    });

    const filtered = processedDestinations.filter(
        item =>
            (!selectedAddress || item.region?.includes(selectedAddress)) &&
            (!selectedCategory || item.category1 === selectedCategory)
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const currentItems = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="destinations-page">
            <div className="destinations-header">
                <h1>여행지 추천</h1>
                <p>지역과 카테고리를 선택하여 여행지를 찾아보세요.</p>
            </div>

            {/* {isLoading && <p>로딩 중...</p>} */}
            {error && <p className="error">{error}</p>}

            {/* 지역 선택 */}
            <div className="selection-section2">
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
                <div className="selection-section2">
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
                    {/* 디버깅용 정보 표시 */}
                    {filtered.length !== 0 ? (
                        <div style={{padding: '5px', background: '#f0f0f0', margin: '15px 0'}}>
                            <p>{filtered.length}곳의 장소가 검색되었습니다 !</p>
                        </div> ) : null}
                    {filtered.length === 0 ? (
                        <p className="no-result">해당 조건의 추천지가 없습니다.</p>
                    ) : (
                        <>
                        <div className="destination-list">
                            {currentItems.map((destination, id) => {
                                // 좌표 문자열 파싱
                                let latitude = null;
                                let longitude = null;

                                const coordsString = destination.coordinates;

                                if (coordsString) {
                                    const match = coordsString.match(/N([\d.]+),\s*E([\d.]+)/);
                                    if (match) {
                                        latitude = parseFloat(match[1]);
                                        longitude = parseFloat(match[2]);
                                    }
                                }

                                return (
                                    <div className="destination-card" key={id}>
                                        <div className="destination-info"
                                            onClick={() => 
                                                navigate('/destination-detail', {
                                                state: {
                                                    destination:{
                                                    ...destination,
                                                    latitude,
                                                    longitude
                                                    },
                                                },
                                            })
                                        }
                                            style={{cursor: 'pointer'}}
                                        >
                                            <h3>{destination.title}</h3>
                                            <p>{destination.category2}</p>
                                            <p>{destination.address}</p>
                                            <p>{destination.description}</p>
                                            <p>{destination.tel}</p>
                                            {isLoading && <p>로딩 중...</p>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* 페이지네이션 버튼 */}
                        <div className="pagination">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(1))}
                            disabled={currentPage === 1}
                        >
                            처음
                        </button>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            이전
                        </button>
                        <span>
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                        >
                            다음
                        </button>
                        <button
                            onClick={() =>
                            setCurrentPage(() => Math.min(totalPages))
                            }
                            disabled={currentPage === totalPages}
                        >
                            마지막
                        </button>
                        </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Destinations;

/**
{filtered.map((destination, id) => (
                                <div className="destination-card" key={id}>
                                    {* <img src={destination.img || '/images/default.jpg'} alt={destination.title} className="destination-img" /> *}
                                    <div className="destination-info"
                                        key={id} 
                                        onClick={()=>navigate('/destination-detail', {state: {
                                            ...destination,
                                            latitude,
                                            longitude
                                        }})}
                                        style={{cursor: 'pointer'}}>
                                        <h3>{destination.title}</h3>
                                        <p>{destination.category2}</p>
                                        <p>{destination.address}</p>
                                        <p>{destination.description}</p>
                                        <p>{destination.tel}</p>
                                    </div>
                                </div>
                            ))} 



 */