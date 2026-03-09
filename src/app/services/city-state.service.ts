import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CityInfo } from '../models/weather.models';

@Injectable({ providedIn: 'root' })
export class CityStateService {
  private readonly _selectedCity$ = new BehaviorSubject<CityInfo | null>(null);
  readonly selectedCity$ = this._selectedCity$.asObservable();

  setSelectedCity(city: CityInfo | null): void {
    this._selectedCity$.next(city);
  }

  get currentCity(): CityInfo | null {
    return this._selectedCity$.value;
  }
}
