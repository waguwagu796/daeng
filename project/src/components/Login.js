import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 백엔드 API 호출 (실제 서버)
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const data = await response.json();

      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/';
      } else {
        setError(data.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // 백엔드가 없을 때 테스트용 (나중에 삭제해야 함!)
      if (formData.email === 'test@test.com' && formData.password === 'test1234') {
        const mockUser = {
          id: 1,
          email: 'test@test.com',
          name: '테스트유저'
        };
        const mockToken = 'mock-jwt-token-12345';
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        alert('테스트 로그인 성공! (백엔드 연결 전 임시)');
        window.location.href = '/';
      } else {
        setError('서버와 연결할 수 없습니다. 백엔드 서버를 확인해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // 백엔드가 준비되면 사용
    window.location.href = `http://localhost:8080/api/auth/${provider}`;
    
    // 임시 테스트용
    //alert(`${provider} 로그인은 백엔드 연결 후 사용 가능합니다.`);
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>로그인</h2>
        
        {/* 테스트 안내 */}
        <div style={{
          background: '#fff3cd',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
          fontSize: '13px',
          color: '#856404'
        }}>
          <strong>테스트 계정:</strong><br/>
          이메일: test@test.com<br/>
          비밀번호: test1234
        </div>
        
        <div className="social-login-section">
          <button 
            className="social-login-btn naver"
            onClick={() => handleSocialLogin('naver')}
            type="button"
          >
            <span style={{fontSize: '18px'}}>N</span>
            네이버로 로그인
          </button>
        </div>

        <div className="divider">
          <span>또는</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="login-footer">
          <Link to="/find-password" className="find-link">비밀번호 찾기</Link>
          <span className="separator">|</span>
          <Link to="/join" className="find-link">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;