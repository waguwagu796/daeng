import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DestinationsDetail.css";
import KakaoMap from "./KakaoMap";
import ReviewSection from "./Review";
import Cookies from "js-cookie";

const DestinationsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { destination } = location.state || {};

//최근 본 여행지 쿠키 저장
  useEffect(() => {
    if (destination) {
      const maxItems = 100;
      const existing = Cookies.get("recentDestinations");
      const list = existing ? JSON.parse(existing) : [];

      // 중복 방지
      const filtered = list.filter((item) => item.title !== destination.title);
      filtered.unshift({
        title: destination.title,
        image: destination.image,
        address: destination.address,
        id: destination._id || destination.id,
      });

      // 최대 5개까지만 저장
      const updated = filtered.slice(0, maxItems);
      Cookies.set("recentDestinations", JSON.stringify(updated), { expires: 7 });
    }
  }, [destination]);

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
