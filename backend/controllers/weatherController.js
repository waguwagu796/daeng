const axios = require('axios');
const Weather = require('../models/Weather');

// 지역별 좌표
const regionCoords = {
  '서울': { lat: 37.5665, lon: 126.9780 },
  '대전': { lat: 36.3504, lon: 127.3845 },
  '대구': { lat: 35.8714, lon: 128.6014 },
  '부산': { lat: 35.1796, lon: 129.0756 },
  '광주': { lat: 35.1595, lon: 126.8526 },
  '울산': { lat: 35.5384, lon: 129.3114 },
  '인천': { lat: 37.4563, lon: 126.7052 },
  '세종': { lat: 36.4802, lon: 127.2890 },
  '경기도': { lat: 37.4138, lon: 127.5183 },
  '강원도': { lat: 37.8228, lon: 128.1555 },
  '충청북도': { lat: 36.8, lon: 127.7 },
  '충청남도': { lat: 36.5, lon: 126.8 },
  '경상북도': { lat: 36.4, lon: 128.6 },
  '경상남도': { lat: 35.4606, lon: 128.2132 },
  '전라북도': { lat: 35.7175, lon: 127.153 },
  '전라남도': { lat: 34.8679, lon: 126.991 },
  '제주도': { lat: 33.4996, lon: 126.5312 }
};

// 날씨 정보 조회
exports.getWeather = async (req, res) => {
  try {
    const { region } = req.params;

    // 좌표 유효성 검사
    if (!regionCoords[region]) {
      return res.status(400).json({ 
        success: false,
        error: '유효하지 않은 지역입니다' 
      });
    }

    // 캐시된 데이터 확인
    const cachedWeather = await Weather.getCachedData(region);

    if (cachedWeather) {
      console.log(`✅ 캐시된 데이터 반환: ${region}`);
      return res.json({
        success: true,
        weather: cachedWeather.data,
        forecast: cachedWeather.forecast,
        cached: true,
        timestamp: cachedWeather.timestamp
      });
    }

    // API 호출
    const coords = regionCoords[region];
    const API_KEY = process.env.OPENWEATHER_API_KEY || '4716996828234e10c7d5f4958a41e4f9';

    const [weatherResponse, forecastResponse] = await Promise.all([
      axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          appid: API_KEY,
          units: 'metric',
          lang: 'kr'
        }
      }),
      axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          appid: API_KEY,
          units: 'metric',
          lang: 'kr'
        }
      })
    ]);

    // MongoDB에 저장
    const newWeather = new Weather({
      region,
      data: weatherResponse.data,
      forecast: forecastResponse.data
    });

    await newWeather.save();
    console.log(`💾 새 데이터 저장: ${region}`);

    res.json({
      success: true,
      weather: weatherResponse.data,
      forecast: forecastResponse.data,
      cached: false,
      timestamp: newWeather.timestamp
    });

  } catch (error) {
    console.error('❌ 날씨 정보 조회 오류:', error.message);
    res.status(500).json({ 
      success: false,
      error: '날씨 정보를 불러올 수 없습니다',
      message: error.message 
    });
  }
};

// 모든 지역 목록 조회
exports.getRegions = (req, res) => {
  try {
    res.json({
      success: true,
      regions: Object.keys(regionCoords),
      count: Object.keys(regionCoords).length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '지역 목록을 불러올 수 없습니다'
    });
  }
};

// 날씨 히스토리 조회
exports.getWeatherHistory = async (req, res) => {
  try {
    const { region } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    const history = await Weather.find({ region })
      .sort({ timestamp: -1 })
      .limit(limit)
      .select('-__v');

    res.json({
      success: true,
      region,
      count: history.length,
      history
    });

  } catch (error) {
    console.error('❌ 히스토리 조회 오류:', error.message);
    res.status(500).json({
      success: false,
      error: '히스토리를 불러올 수 없습니다'
    });
  }
};

// 모든 날씨 데이터 삭제 (관리자용)
exports.clearWeatherCache = async (req, res) => {
  try {
    const result = await Weather.deleteMany({});
    
    res.json({
      success: true,
      message: '캐시가 삭제되었습니다',
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error('❌ 캐시 삭제 오류:', error.message);
    res.status(500).json({
      success: false,
      error: '캐시 삭제에 실패했습니다'
    });
  }
};