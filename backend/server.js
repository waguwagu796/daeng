const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const reviewRouter = require('./routes/review');

const app = express();
const PORT = process.env.PORT || 3000;

const passwordRoutes = require('./routes/password');

app.use('/api/password', passwordRoutes);

// 데이터베이스 연결
const connectDB = require('./config/database');
connectDB();

// 미들웨어
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공 (업로드 이미지)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 라우트
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api',reviewRouter)

// 기본 라우트
app.get('/', (req, res) => {
  res.json({
    message: 'Daeng 백엔드 서버가 실행중입니다.',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      boards: '/api/boards',
      places: '/api/places',
      wishlist: '/api/wishlist'
    }
  });
});

// 404 에러 핸들링
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '요청하신 페이지를 찾을 수 없습니다.'
  });
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error('서버 에러:', err);
  res.status(500).json({
    success: false,
    message: '서버 오류가 발생했습니다.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행중입니다.`);
  console.log(`http://localhost:${PORT}`);
});