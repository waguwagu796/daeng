const mongoose = require('mongoose');
const userSchema = require('../models/userSchema');

mongoose.connect('mongodb://localhost:27017/testdb')
  .then(() => console.log('MongoDB 연결 성공'))
  .catch(err => console.error('MongoDB 연결 실패:', err));

async function run() {
  const newUser = new userSchema({
    email: 'test@example.com',
    password: '123456',
    name: '홍길동',
    nickname: '길동이'
  });

  await newUser.save();
  console.log('사용자 저장 완료:', newUser);
}

run();
