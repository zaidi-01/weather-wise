/**
 * Weather interface
 */
export default interface Weather {
  /**
   * Coordinates of the location
   */
  coord: {
    /**
     * Longitude
     */
    lon: number;
    /**
     * Latitude
     */
    lat: number;
  };

  /**
   * Weather conditions
   */
  weather: {
    /**
     * Weather condition ID
     */
    id: number;
    /**
     * Group of weather parameters (Rain, Snow, Extreme etc.)
     */
    main: string;
    /**
     * Weather condition within the group
     */
    description: string;
    /**
     * Weather icon ID
     */
    icon: string;
  }[];

  /**
   * Main weather data
   */
  main: {
    /**
     * Temperature
     */
    temp: number;

    /**
     * Feels like temperature
     */
    feels_like: number;
    /**
     * Minimum temperature at the moment
     */
    temp_min: number;
    /**
     * Maximum temperature at the moment
     */
    temp_max: number;
    /**
     * Atmospheric pressure (on the sea level, if there is no {@link sea_level} or {@link grnd_level} data), hPa
     */
    pressure: number;
    /**
     * Humidity, %
     */
    humidity: number;
    /**
     * Atmospheric pressure on the sea level, hPa
     */
    sea_level: number;
    /**
     * Atmospheric pressure on the ground level, hPa
     */
    grnd_level: number;
  };

  /**
   * Visibility
   */
  visibility: number;

  /**
   * Wind data
   */
  wind: {
    /**
     * Wind speed
     */
    speed: number;
    /**
     * Wind direction, degrees (meteorological)
     */
    deg: number;
    /**
     * Wind gust
     */
    gust: number;
  };

  /**
   * Cloud data
   */
  clouds: {
    /**
     * Cloudiness, %
     */
    all: number;
  };
  /**
   * Rain data
   */
  rain: {
    /**
     * Rain volume for the last 1 hour, mm
     */
    "1h": number;
    /**
     * Rain volume for the last 3 hours, mm
     */
    "3h": number;
  };

  /**
   * Snow data
   */
  snow: {
    /**
     * Snow volume for the last 1 hour, mm
     */
    "1h": number;
    /**
     * Snow volume for the last 3 hours, mm
     */
    "3h": number;
  };

  /**
   * Time of data calculation
   */
  dt: number;

  /**
   * System data
   */
  sys: {
    /**
     * Country code (GB, JP etc.)
     */
    country: string;
    /**
     * Sunrise time, unix, UTC
     */
    sunrise: number;
    /**
     * Sunset time, unix, UTC
     */
    sunset: number;
  };

  /**
   * Timezone
   */
  timezone: number;

  /**
   * City ID
   */
  id: number;

  /**
   * City name
   */
  name: string;
}
