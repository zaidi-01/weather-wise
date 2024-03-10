import React from "react";
import axios from "axios";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    console.log("Weather component created");

    this.state = {
      weather: null,
    };
  }

  async componentDidMount() {
    const apiKey = "API_KEY";
    const city = "CITY_NAME";

    try {
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );
      const { lat, lon } = geoResponse.data[0];

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      this.setState({ weather: weatherResponse.data });
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  }

  render() {
    if (!this.state.weather) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Weather in {this.state.weather.name}</h2>
        <p>Temperature: {this.state.weather.main.temp}°C</p>
        <p>Humidity: {this.state.weather.main.humidity}%</p>
        <p>Wind: {this.state.weather.wind.speed} m/s</p>
      </div>
    );
  }
}

export default Weather;
