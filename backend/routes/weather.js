const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// 모든 지역 목록 조회
router.get('/regions', weatherController.getRegions);

// 캐시 삭제 (관리자용) - 먼저 선언
router.delete('/cache/clear', weatherController.clearWeatherCache);

// 특정 지역 날씨 히스토리 조회 - :region 보다 먼저
router.get('/:region/history', weatherController.getWeatherHistory);

// 특정 지역 날씨 조회 - 마지막에
router.get('/:region', weatherController.getWeather);

module.exports = router;