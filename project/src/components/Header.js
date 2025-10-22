import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">

      <div className="top-nav">
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
      </div>

      <nav className="main-nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <a href="/">
                <img src='/logo/DaengTrip.png' alt="Logo" className="logo-image" />
              </a>
            </div>

            <div className="desktop-menu">
              <ul className="nav-list">
                <li className="nav-item">
                  <a href="#destinations" className="nav-link">여행지</a>
                </li>
                <li className="nav-item">
                  <a href="#community" className="nav-link">커뮤니티</a>
                </li>
                <li className="nav-item">
                  <a href="#weather" className="nav-link">날씨 정보</a>
                </li>
              </ul>
            </div>

            <div>
              <ul className="nav-join-login">
                <li className="nav-join-login2">
                  <a href="#join" className="nav-account-link">회원가입</a>
                </li>
                <li className="nav-join-login2">
                  <a href="#login" className="nav-account-link">로그인</a>
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

