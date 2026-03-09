import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CityInfo,
  CurrentWeather,
  ForecastResponse,
  GeocodingResponse,
} from '../models/weather.models';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly GEO_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
  private readonly FORECAST_BASE = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  geocodeCity(name: string): Observable<CityInfo | null> {
    const params = new HttpParams()
      .set('name', name)
      .set('count', 1);

    return this.http.get<GeocodingResponse>(this.GEO_BASE, { params }).pipe(
      map((res) => {
        if (!res.results || res.results.length === 0) return null;
        const r = res.results[0];
        const city: CityInfo = {
          name: r.name,
          latitude: r.latitude,
          longitude: r.longitude,
          country: r.country,
          admin1: r.admin1,
        };
        return city;
      })
    );
  }

  getCurrentWeather(latitude: number, longitude: number): Observable<CurrentWeather> {
    const params = new HttpParams()
      .set('latitude', String(latitude))
      .set('longitude', String(longitude))
      .set('current_weather', 'true');

    return this.http.get<ForecastResponse>(this.FORECAST_BASE, { params }).pipe(
      map((res) => res.current_weather)
    );
  }
}