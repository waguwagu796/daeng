const Member = require('../models/Member');
const jwt = require('jsonwebtoken');

// JWT 토큰 생성
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// 회원가입
exports.register = async (req, res) => {
  try {
    const { email, password, name, nickname, phone } = req.body;

    // 필수 입력값 확인
    if (!email || !password || !name || !nickname) {
      return res.status(400).json({
        success: false,
        message: '이메일, 비밀번호, 이름, 닉네임을 모두 입력해주세요'
      });
    }

    // 이미 존재하는 이메일 확인
    const existingEmail = await Member.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: '이미 사용 중인 이메일입니다'
      });
    }

    // 이미 존재하는 닉네임 확인
    const existingNickname = await Member.findOne({ nickname });
    if (existingNickname) {
      return res.status(400).json({
        success: false,
        message: '이미 사용 중인 닉네임입니다'
      });
    }

    // 회원 생성
    const member = await Member.create({
      email,
      password,
      name,
      nickname,
      phone
    });

    // JWT 토큰 생성
    const token = generateToken(member._id);

    res.status(201).json({
      success: true,
      message: '회원가입이 완료되었습니다',
      data: {
        member: {
          id: member._id,
          email: member.email,
          name: member.name,
          nickname: member.nickname,
          phone: member.phone,
          profileImage: member.profileImage
        },
        token
      }
    });

  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({
      success: false,
      message: '회원가입 중 오류가 발생했습니다',
      error: error.message
    });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 입력값 확인
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '이메일과 비밀번호를 입력해주세요'
      });
    }

    // 회원 찾기 (비밀번호 포함)
    const member = await Member.findOne({ email }).select('+password');
    
    if (!member) {
      return res.status(401).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다'
      });
    }

    // 비밀번호 확인
    const isPasswordMatch = await member.matchPassword(password);
    
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다'
      });
    }

    // JWT 토큰 생성
    const token = generateToken(member._id);

    res.status(200).json({
      success: true,
      message: '로그인 성공',
      data: {
        member: {
          id: member._id,
          email: member.email,
          name: member.name,
          nickname: member.nickname,
          phone: member.phone,
          profileImage: member.profileImage
        },
        token
      }
    });

  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({
      success: false,
      message: '로그인 중 오류가 발생했습니다',
      error: error.message
    });
  }
};

// 내 정보 조회
exports.getMe = async (req, res) => {
  try {
    const member = await Member.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        member: {
          id: member._id,
          email: member.email,
          name: member.name,
          nickname: member.nickname,
          phone: member.phone,
          profileImage: member.profileImage,
          createdAt: member.createdAt
        }
      }
    });
  } catch (error) {
    console.error('내 정보 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '내 정보를 불러오는 중 오류가 발생했습니다'
    });
  }
};