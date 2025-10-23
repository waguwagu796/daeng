import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">

      {/* 언어 변경 영역 */}
      {/* <div className="top-nav">
        <div className="container">
          <div className="top-nav-content">
            <div className="meetings-events">
            </div>
            <div className="language-selector">
              <select className="language-dropdown">
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </div>
      </div> */}

      <nav className="main-nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <Link to="/">
                <img src='/logo/DaengTrip.png' alt="Logo" className="logo-image" />
              </Link>
            </div>

            <div className="desktop-menu">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/destinations" className="nav-link" onClick={() => console.log("클릭됨")}>여행지</Link>
                </li>
                <li className="nav-item">
                  <Link to="/community" className="nav-link">커뮤니티</Link>
                </li>
                <li className="nav-item">
                  <Link to="/weather" className="nav-link">날씨 정보</Link>
                </li>
              </ul>
            </div>

            <div>
              <ul className="nav-join-login">
                <li className="nav-join-login2">
                  <Link to="/join" className="nav-account-link">회원가입</Link>
                </li>
                <li className="nav-join-login2">
                  <Link to="/login" className="nav-account-link">로그인</Link>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </nav>
    </header>
  );
};

export default Header;

