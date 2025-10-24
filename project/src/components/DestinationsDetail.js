import React from 'react';
import { useLocation } from 'react-router-dom';

const DestinationsDetail = () => {

    const location = useLocation()
    const {destination} = location.state || {}

    if(!destination){
        return <p style={{textAlign: 'center', marginTop: '50px'}}>잘못된 접근입니다</p>
    }
    return (
        <div className="destination-detail">
            <h1>{destination.title}</h1>
            <p><strong>카테고리:</strong> {destination.category2}</p>
            <p><strong>주소:</strong> {destination.adress}</p>
            <p><strong>전화번호:</strong> {destination.tell || '정보 없음'}</p>
            <p><strong>설명:</strong> {destination.description || '설명없음'}</p>
        </div>
    );
};

export default DestinationsDetail;