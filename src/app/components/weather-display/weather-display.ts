import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CityStateService } from '../../services/city-state.service';
import { WeatherService } from '../../services/weather.service';
import { CityInfo, CurrentWeather } from '../../models/weather.models';

interface WeatherVM {
  city: CityInfo;
  weather: CurrentWeather;
}

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-display.html',
  styleUrls: ['./weather-display.css']
})
export class WeatherDisplayComponent {
  vm$!: Observable<WeatherVM | null>;

  constructor(
    private cityState: CityStateService,
    private weatherService: WeatherService
  ) {
    // Build the VM stream once the service is injected (avoids "used before initialization")
    this.vm$ = this.cityState.selectedCity$.pipe(
      switchMap((city) => {
        if (!city) return of(null);
        return this.weatherService
          .getCurrentWeather(city.latitude, city.longitude)
          .pipe(map((weather) => ({ city, weather })));
      })
    );
  }
}