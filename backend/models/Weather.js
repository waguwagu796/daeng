const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true,
    trim: true
  },
  data: {
    type: Object,
    required: true
  },
  forecast: {
    type: Object
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// 5분마다 자동으로 오래된 데이터 삭제 (캐시 유효시간)
weatherSchema.index({ timestamp: 1 }, { expireAfterSeconds: 300 });

// 지역별 최신 데이터 조회 메서드
weatherSchema.statics.getLatestByRegion = function(region) {
  return this.findOne({ region })
    .sort({ timestamp: -1 })
    .exec();
};

// 캐시된 데이터 조회 메서드 (5분 이내)
weatherSchema.statics.getCachedData = function(region) {
  return this.findOne({
    region,
    timestamp: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
  }).sort({ timestamp: -1 });
};

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;