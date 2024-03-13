import { CanceledError } from "axios";
import { Weather as WeatherModel } from "models";
import React from "react";
import { WeatherService } from "services";

interface WeatherState {
  city: string;
  controller: AbortController | null;
  weather: WeatherModel | null;
}

interface WeatherProps {
  city: string;
}

class Weather extends React.Component<WeatherProps, WeatherState> {
  static getDerivedStateFromProps(
    props: Readonly<WeatherProps>,
    state: Readonly<WeatherState>
  ) {
    if (props.city !== state.city) {
      return { city: props.city };
    }

    return null;
  }

  state: WeatherState;

  constructor(props: Readonly<WeatherProps>) {
    super(props);

    this.state = {
      city: props.city,
      controller: null,
      weather: null,
    };
  }

  async componentDidMount() {
    if (this.state.city) {
      await this.fetchWeather();
    }
  }

  componentDidUpdate(prevState: Readonly<WeatherState>): void {
    if (prevState.city !== this.state.city) {
      this.fetchWeather();
    }
  }

  shouldComponentUpdate(nextState: Readonly<WeatherState>) {
    if (nextState.weather !== this.state.weather) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    setTimeout(() => {
      this.state.controller?.abort();
    });
  }

  render() {
    if (!this.state.weather) {
      return <div className="weather">Loading...</div>;
    }

    return (
      <div className="weather">
        <h2>Weather in {this.state.weather.name}</h2>
        <p>Temperature: {this.state.weather.main.temp}°C</p>
        <p>Humidity: {this.state.weather.main.humidity}%</p>
        <p>Wind: {this.state.weather.wind.speed} m/s</p>
      </div>
    );
  }

  private async fetchWeather() {
    this.state.controller?.abort();

    const city = this.state.city;
    const controller = new AbortController();
    this.setState({ weather: null, controller });

    return WeatherService.getWeather(city, controller.signal)
      .then((weather) => this.setState({ weather, controller: null }))
      .catch((error) => {
        if (!(error instanceof CanceledError)) {
          console.error("Error fetching weather", error);
        }
      });
  }
}

export default Weather;
