import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import userService from '../services/userService';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [users,setUsers] = useState([])
  const navigate = useNavigate();


    useEffect(()=>{
        onData()
    })

    const onData = async() => {
        const res = await userService.getUser()
        setUsers(res)
    }

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

    // 유효성 검사
    if (!formData.email || !formData.password || !formData.name || !formData.nickname) {
      setError('필수 항목을 모두 입력해주세요');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다');
      return;
    }

    setLoading(true);

    try {
      // 백엔드 API 호출
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          nickname: formData.nickname,
          // phone: formData.phone
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 토큰과 사용자 정보 저장
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.member));
        
        alert('회원가입이 완료되었습니다!');
        navigate('/');
      } else {
        setError(data.message || '회원가입에 실패했습니다.');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('서버와 연결할 수 없습니다. 백엔드 서버를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    // 백엔드가 준비되면 사용
    window.location.href = `http://localhost:8080/api/auth/${provider}`;
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>회원가입</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일 *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호 *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="최소 6자 이상"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">비밀번호 확인 *</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">이름 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nickname">닉네임 *</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="길동이"
              required
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input
              //type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-1234-5678"
            />
          </div> */}

          {error && <p className="error-message">{error}</p>}

          <button 
            type="submit" 
            className="register-button"
            disabled={loading}
          >
            {loading ? '처리 중...' : '회원가입'}
          </button>
        </form>

        <div className="register-footer">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login" className="login-link">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;