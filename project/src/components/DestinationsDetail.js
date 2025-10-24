import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DestinationsDetail.css";
import KakaoMap from "./KakaoMap";
import ReviewSection from "./Review";

const DestinationsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { destination } = location.state || {};

  if (!destination) {
    return (
      <div className="detail-empty">
        <p>잘못된 접근입니다.</p>
        <button onClick={() => navigate("/destinations")}>목록으로 돌아가기</button>
      </div>
    );
  }

  return (
    <div className="destination-detail">
      {/* 뒤로가기 버튼 */}
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>← 목록으로</button>
      </div>

      <div className="detail-content">
        {/* 이미지 영역 */}
        <div className="detail-image-box">
          <img
            src={destination.image || "/images/default.jpg"}
            alt={destination.title}
            className="detail-image"
          />
        </div>

        {/* 정보 영역 */}
        <div className="detail-info">
          <h1 className="detail-title">{destination.title}</h1>
          <p className="detail-category">{destination.category2}</p>

          <div className="detail-description">
            <h3>설명</h3>
            <p>{destination.description || "등록된 설명이 없습니다."}</p>
          </div>

          <div className="detail-meta">
            <p><strong>주소</strong> : {destination.address || "정보 없음"}</p>
            <p><strong>전화번호</strong> : {destination.tel || "정보 없음"}</p>
          </div>
        </div>
      </div>

      {/* 지도 영역 */}
      <div className="detail-map">
        <KakaoMap 
            latitude={destination.latitude} 
            longitude={destination.longitude} 
            title={destination?.title || "지도"} 
        />
        </div>
        <ReviewSection destinationId={"test-destination"} currentUser={{ name: "홍원식" }}/>
    </div>
  );
};

export default DestinationsDetail;
