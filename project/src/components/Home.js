import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Home.css";
import '../App.css';

const Home = () => {
  const [recentDestinations, setRecentDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = Cookies.get("recentDestinations");
    if (stored) {
      setRecentDestinations(JSON.parse(stored));
    }
  }, []);

  const handleClick = (destination) => {
    navigate("/destination-detail", { state: { destination } });
  };

   const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  return (
    <div>
      <main className="main-content">
        <div className="hero-section">
          <h1>지도는</h1>
          <p>여기에 넣을 예정</p>
        </div>

        {/* 최근 검색목록 자동슬라이드 */}
        <div className="home">
            <h2 className="text-center mb-4">최근 본 여행지</h2>
            {recentDestinations.length === 0 ? (
                <p className="text-center text-muted">최근 본 여행지가 없습니다 😢</p>
            ) : (
                <Carousel
                responsive={responsive}
                swipeable
                draggable
                showDots={false}
                infinite={true}         
                keyBoardControl
                containerClass="carousel-container"
                itemClass="px-2"
                autoPlay={true}                
                autoPlaySpeed={3000}    
                transitionDuration={500}
                >
                {recentDestinations.map((item, idx) => (
                    <div
                    key={idx}
                    className="recent-item"
                    onClick={() => handleClick(item)}
                    style={{ cursor: "pointer" }}
                    >
                    <img
                        src={item.image || "/default.jpg"}
                        alt={item.title}
                        style={{ width: "100%", height: "120px", objectFit: "cover" }}
                    />
                    <div className="p-2 text-center">
                        <h4 className="fw-bold">{item.title}</h4>
                        <p className="text-muted small mb-0">
                        {item.description?.slice(0, 40)}
                        </p>
                    </div>
                    </div>
                ))}
                </Carousel>
            )}
            </div>
      </main>
    </div>
  );
};

export default Home;
