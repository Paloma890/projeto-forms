import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IStatesResponse } from '../interfaces/states-response/states-response.interface';
@Injectable({
    providedIn: 'root',
})
export class StatesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) {}

  getStates(countryName: string) {
    return this._httpClient.post<IStatesResponse>(
      'https://countriesnow.space/api/v0.1/countries/states',
      { country: countryName }
    ).pipe(
      map((statesResponse) => {
        return statesResponse.data.states
      })
    );
  }
}
