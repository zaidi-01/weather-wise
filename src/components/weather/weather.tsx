import { CircularProgress, Icon } from "@mui/material";
import { CanceledError } from "axios";
import { Weather as WeatherModel } from "models";
import React from "react";
import { WeatherService } from "services";
import "./weather.scss";

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
      return (
        <div className="weather">
          <CircularProgress />
        </div>
      );
    }

    const weather = this.state.weather;
    return (
      <div className="weather">
        <div className="details">
          <div className="header">
            <div className="icon">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
            </div>
            <h2>{weather.name}</h2>
          </div>
          <div className="content">
            <div className="temperature">
              <p className="display">
                <span>{Math.round(weather.main.temp)}</span>
                <sup>&deg;C</sup>
              </p>
              <p className="description">{weather.weather[0].description}</p>
              <p className="feels-like">
                {Math.round(weather.main.temp_min)}&deg; / {""}
                {Math.round(weather.main.temp_max)}&deg; Feels like{" "}
                {Math.round(weather.main.feels_like)}&deg;
              </p>
            </div>
            <div className="attributes">
              <p className="attribute">
                <Icon className="icon">opacity</Icon>
                <span className="value">{weather.main.humidity}%</span>
              </p>
              <p className="attribute">
                <Icon className="icon">speed</Icon>
                <span className="value">{weather.main.pressure}hPa</span>
              </p>
              <p className="attribute">
                <Icon className="icon">air</Icon>
                <span className="value">{weather.wind.speed}m/s</span>
              </p>
            </div>
          </div>
        </div>
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
