const Member = require('../models/Member');
const jwt = require('jsonwebtoken');
// const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

// 비밀번호 재설정 토큰 발급 (이메일 인증)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: '이메일을 입력해주세요'
      });
    }

    // 회원 찾기
    const member = await Member.findOne({ email });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: '해당 이메일로 가입된 계정이 없습니다'
      });
    }

    // 비밀번호 재설정 토큰 생성 (30분 유효)
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // 토큰 해시화하여 저장
    member.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    member.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30분
    
    await member.save({ validateBeforeSave: false });

    // 재설정 URL 생성
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // 이메일 전송
    const message = `
      <h2>비밀번호 재설정 안내</h2>
      <p>안녕하세요, ${member.name}님</p>
      <p>비밀번호 재설정 요청을 받았습니다.</p>
      <p>아래 버튼을 클릭하여 새로운 비밀번호를 설정해주세요.</p>
      <div style="margin: 30px 0; text-align: center;">
        <a href="${resetUrl}" 
           style="background: #4ade80; color: white; padding: 12px 30px; 
                  text-decoration: none; border-radius: 8px; display: inline-block;
                  font-weight: bold;">
          비밀번호 재설정하기
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">
        또는 아래 링크를 복사하여 브라우저에 붙여넣기 하세요:<br>
        <span style="color: #4ade80;">${resetUrl}</span>
      </p>
      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        ⚠️ 이 링크는 30분 동안만 유효합니다.<br>
        본인이 요청하지 않았다면 이 메일을 무시하세요.
      </p>
    `;

    await sendEmail({
      email: member.email,
      subject: '[댕댕이여행] 비밀번호 재설정 안내',
      message
    });

    res.status(200).json({
      success: true,
      message: '비밀번호 재설정 링크가 이메일로 발송되었습니다'
    });

  } catch (error) {
    console.error('비밀번호 찾기 에러:', error);
    res.status(500).json({
      success: false,
      message: '비밀번호 찾기 중 오류가 발생했습니다',
      error: error.message
    });
  }
};

// 비밀번호 재설정 (토큰 검증 후)
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: '새 비밀번호를 입력해주세요'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: '비밀번호는 최소 6자 이상이어야 합니다'
      });
    }

    // 토큰 해시화
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // 토큰과 만료시간으로 회원 찾기
    const member = await Member.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!member) {
      return res.status(400).json({
        success: false,
        message: '유효하지 않거나 만료된 토큰입니다'
      });
    }

    // 새 비밀번호 설정
    member.password = password;
    member.resetPasswordToken = undefined;
    member.resetPasswordExpire = undefined;
    
    await member.save();

    // 새 토큰 발급
    const jwtToken = generateToken(member._id);

    res.status(200).json({
      success: true,
      message: '비밀번호가 성공적으로 변경되었습니다',
      data: {
        token: jwtToken
      }
    });

  } catch (error) {
    console.error('비밀번호 재설정 에러:', error);
    res.status(500).json({
      success: false,
      message: '비밀번호 재설정 중 오류가 발생했습니다',
      error: error.message
    });
  }
};

// 비밀번호 변경 (로그인 상태)
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: '현재 비밀번호와 새 비밀번호를 모두 입력해주세요'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: '새 비밀번호는 최소 6자 이상이어야 합니다'
      });
    }

    // 현재 회원 정보 가져오기 (비밀번호 포함)
    const member = await Member.findById(req.user.id).select('+password');

    // 현재 비밀번호 확인
    const isPasswordMatch = await member.matchPassword(currentPassword);
    
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: '현재 비밀번호가 올바르지 않습니다'
      });
    }

    // 새 비밀번호로 변경
    member.password = newPassword;
    await member.save();

    // 새 토큰 발급
    const token = generateToken(member._id);

    res.status(200).json({
      success: true,
      message: '비밀번호가 성공적으로 변경되었습니다',
      data: {
        token
      }
    });

  } catch (error) {
    console.error('비밀번호 변경 에러:', error);
    res.status(500).json({
      success: false,
      message: '비밀번호 변경 중 오류가 발생했습니다',
      error: error.message
    });
  }
};