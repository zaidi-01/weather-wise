import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherService = {
  async getWeather(city) {
    const geoResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const { lat, lon } = geoResponse.data[0];

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return weatherResponse.data;
  },
};

export default WeatherService;
