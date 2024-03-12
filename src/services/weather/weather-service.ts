import axios from "axios";
import { Weather } from "models";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

interface GeoResponse {
  country: string;
  name: string;
  lat: number;
  lon: number;
  local_names: Map<string, string>;
}

const WeatherService = {
  async getWeather(city: string, signal: AbortSignal) {
    const geoResponse = await axios.get<GeoResponse[]>(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
      { signal }
    );
    const { lat, lon } = geoResponse.data[0];

    const weatherResponse = await axios.get<Weather>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      { signal }
    );
    return weatherResponse.data;
  },
};

export default WeatherService;
