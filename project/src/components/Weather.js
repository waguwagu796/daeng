import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
  const [selectedRegion, setSelectedRegion] = useState('서울');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const regions = [
    '서울', '대전', '대구', '부산', '광주', '울산', '인천', '경기도', '강원도',
    '충청북도', '충청남도', '경상북도', '경상남도', '전라북도', '전라남도', '제주도'
  ];

  // 지역별 좌표 
  const regionCoords = {
    '서울': { lat: 37.5665, lon: 126.9780 },
    '대전': { lat: 36.3504, lon: 127.3845 },
    '대구': { lat: 35.8714, lon: 128.6014 },
    '부산': { lat: 35.1796, lon: 129.0756 },
    '광주': { lat: 35.1595, lon: 126.8526 },
    '울산': { lat: 35.5384, lon: 129.3114 },
    '인천': { lat: 37.4563, lon: 126.7052 },
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

  useEffect(() => {
    fetchWeather(selectedRegion);
  }, [selectedRegion]);

  const fetchWeather = async (region) => {
    setLoading(true);
    setError('');

    try {
      const coords = regionCoords[region];
      const API_KEY = '4716996828234e10c7d5f4958a41e4f9'; 
      
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=kr`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=kr`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);
      
      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('날씨 정보를 불러올 수 없습니다');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();
      
      setWeatherData(weatherData);
      setForecastData(forecastData);
    } catch (err) {
      setError('날씨 정보를 불러오는 중 오류가 발생했습니다. API 키를 확인해주세요.');
      console.error('Weather fetch error:', err);

      // 테스트용 더미 데이터
      setWeatherData({
        name: region,
        main: { temp: 18, feels_like: 16, humidity: 65 },
        weather: [{ main: 'Clear', description: '맑음', icon: '01d' }],
        wind: { speed: 3.5 }
      });
    } finally {
      setLoading(false);
    }
  };

  const getDailyForecast = () => {
    if (!forecastData) return [];
    
    const dailyData = {};
    const today = new Date().toDateString();
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toDateString();
      if (dateStr === today) return;
      
      if (!dailyData[dateStr]) {
        dailyData[dateStr] = {
          date,
          temps: [],
          weather: item.weather[0],
          main: item.weather[0].main
        };
      }
      dailyData[dateStr].temps.push(item.main.temp);
    });
    
    return Object.values(dailyData).slice(0, 7).map(day => ({
      dayName: ['일', '월', '화', '수', '목', '금', '토'][day.date.getDay()],
      high: Math.round(Math.max(...day.temps)),
      low: Math.round(Math.min(...day.temps)),
      icon: day.weather.icon,
      main: day.main
    }));
  };

  const dailyForecast = getDailyForecast();

  return (
    <div className="weather-container">
      <div className="weather-content">
        <h1 className="weather-title">날씨 정보</h1>
        <p className="weather-subtitle">우리 지역의 최신 날씨를 확인해보세요</p>

        {/* 지역 선택 */}
        <div className="region-selector">
          <h3>지역 선택</h3>
          <div className="region-buttons">
            {regions.map((region) => (
              <button
                key={region}
                className={`region-button ${selectedRegion === region ? 'active' : ''}`}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* 날씨 정보 */}
        {loading ? (
          <div className="loading">날씨 정보를 불러오는 중...</div>
        ) : weatherData ? (
          <div className="weather-card">
            <div className="weather-main">
              <div className="weather-icon">
                {weatherData.weather[0].icon && (
                  <img 
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                    alt={weatherData.weather[0].description}
                  />
                )}
              </div>
              <div className="weather-info">
                <h2 className="location">{selectedRegion}</h2>
                <div className="temperature">{Math.round(weatherData.main.temp)}°C</div>
                <div className="description">{weatherData.weather[0].description}</div>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-label">체감온도</span>
                <span className="detail-value">{Math.round(weatherData.main.feels_like)}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">습도</span>
                <span className="detail-value">{weatherData.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">풍속</span>
                <span className="detail-value">{weatherData.wind.speed}m/s</span>
              </div>
            </div>

            {/* 주간 예보 */}
            {dailyForecast.length > 0 && (
              <div className="weekly-forecast">
                <h3>주간 예보</h3>
                <div className="forecast-days">
                  {dailyForecast.map((day, index) => (
                    <div key={index} className="forecast-day">
                      <div className="day-name">{day.dayName}</div>
                      <img 
                        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                        alt="weather icon"
                        className="forecast-icon"
                      />
                      <div className="day-temps">
                        <span className="temp-high">{day.high}°</span>
                        <span className="temp-low">{day.low}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="no-data">날씨 정보를 불러올 수 없습니다</div>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Weather;
