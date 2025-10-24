const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB 연결 성공: ${conn.connection.host}`);
  } catch (error) {
    console.log('데이터베이스 연결 실패:', error.message);
    console.log('MongoDB 서버가 실행 중인지 확인하세요!');
  }
};

module.exports = connectDB;