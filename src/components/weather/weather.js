import { CanceledError } from "axios";
import React from "react";
import { WeatherService } from "services";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      controller: null,
    };
  }

  async componentDidMount() {
    const city = "CITY_NAME";

    const controller = new AbortController();
    this.setState({ controller });

    WeatherService.getWeather(city, controller.signal)
      .then((weather) => this.setState({ weather }))
      .catch((error) => {
        if (!error instanceof CanceledError) {
          console.error("Error fetching weather", error);
        }
      });
  }

  componentWillUnmount() {
    setTimeout(() => {
      this.state.controller.abort();
    });
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
