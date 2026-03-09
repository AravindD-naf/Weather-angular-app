import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CityStateService } from '../../services/city-state.service';
import { CityInfo } from '../../models/weather.models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  selectedCity$!: Observable<CityInfo | null>;

  constructor(private cityState: CityStateService) {
    // Initialize inside constructor to avoid "used before initialization" errors
    this.selectedCity$ = this.cityState.selectedCity$;
  }
}