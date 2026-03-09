export interface CityInfo {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;  // °C
  windspeed: number;    // km/h
  weathercode: number;
  time: string;         // ISO timestamp
}

export interface GeocodingResponse {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    admin1?: string;
  }>;
}

export interface ForecastResponse {
  current_weather: CurrentWeather;
}