import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header';
import { WeatherSearchComponent } from './components/weather-search/weather-search';
import { WeatherDisplayComponent } from './components/weather-display/weather-display';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, WeatherSearchComponent, WeatherDisplayComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}