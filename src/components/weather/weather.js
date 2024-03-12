import React from "react";
import { WeatherService } from "services";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    console.log("Weather component created");

    this.state = {
      weather: null,
    };
  }

  async componentDidMount() {
    const city = "CITY_NAME";

    try {
      const weather = await WeatherService.getWeather(city);
      this.setState({ weather });
    } catch (error) {
      console.error("Error fetching weather", error);
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
