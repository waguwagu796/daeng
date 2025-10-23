const express = require('express');
const router = express.Router();
const { forgotPassword, updatePassword } = require('../controllers/passwordController');
const { protect } = require('../middleware/auth');

// 비밀번호 찾기 (임시 비밀번호 발급)
router.post('/forgot', forgotPassword);

// 비밀번호 변경 (로그인 필요)
router.put('/update', protect, updatePassword);

module.exports = router;