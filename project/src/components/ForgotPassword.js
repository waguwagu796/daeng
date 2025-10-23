import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 유효성 검사
    if (!email) {
      setError('이메일을 입력해주세요');
      return;
    }

    setLoading(true);

    try {
      // 백엔드 API 호출
      const response = await fetch('http://localhost:8080/api/password/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('임시 비밀번호가 이메일로 발송되었습니다. 이메일을 확인해주세요.');
        setEmail('');
        
        // 3초 후 로그인 페이지로 이동
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.message || '비밀번호 찾기에 실패했습니다.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('서버와 연결할 수 없습니다. 백엔드 서버를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>비밀번호 찾기</h2>
        <p className="forgot-password-description">
          가입하신 이메일 주소를 입력하시면<br />
          임시 비밀번호를 발송해 드립니다.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
                setSuccess('');
              }}
              placeholder="example@email.com"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button 
            type="submit" 
            className="forgot-password-button"
            disabled={loading}
          >
            {loading ? '처리 중...' : '임시 비밀번호 받기'}
          </button>
        </form>

        <div className="forgot-password-footer">
          <Link to="/login" className="back-to-login">로그인으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;