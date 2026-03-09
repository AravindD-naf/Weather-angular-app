import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { CityStateService } from '../../services/city-state.service';

@Component({
  selector: 'app-weather-search',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ needed for [(ngModel)]
  templateUrl: './weather-search.html',
  styleUrls: ['./weather-search.css']
})
export class WeatherSearchComponent {
  cityName = '';
  loading = false;
  errorMsg = '';

  constructor(
    private weatherService: WeatherService,
    private cityState: CityStateService
  ) {}

  search(): void {
    this.errorMsg = '';
    const name = this.cityName.trim();
    if (!name) {
      this.errorMsg = 'Please enter a city name.';
      return;
    }

    this.loading = true;
    this.weatherService.geocodeCity(name).subscribe({
      next: (city) => {
        this.loading = false;
        if (!city) {
          this.errorMsg = `No results found for "${name}".`;
          this.cityState.setSelectedCity(null);
          return;
        }
        this.cityState.setSelectedCity(city);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Failed to search. Please try again.';
      }
    });
  }

  onSubmit(evt: Event): void {
    evt.preventDefault();
    this.search();
  }
}