const jwt = require('jsonwebtoken');
const Member = require('../models/Member');

exports.protect = async (req, res, next) => {
  let token;

  // 헤더에서 토큰 추출
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 토큰이 없으면
  if (!token) {
    return res.status(401).json({
      success: false,
      message: '로그인이 필요합니다'
    });
  }

  try {
    // 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 사용자 정보 조회
    req.user = await Member.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: '사용자를 찾을 수 없습니다'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: '유효하지 않은 토큰입니다'
    });
  }
};

// 관리자 권한 확인
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: '관리자 권한이 필요합니다'
    });
  }
};