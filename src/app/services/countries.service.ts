import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ICountriesResponse } from "../interfaces/contries-response/countries-response.interface";
import { ICountry } from "../interfaces/contries-response/country.interface";

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
  constructor (
    private readonly _httpClient: HttpClient
  ) {}

  getCountries(): Observable<ICountry[]> {
    return this._httpClient.get<ICountriesResponse>('https://countriesnow.space/api/v0.1/countries/positions').pipe(
      map((countriesResponse) => {
          return countriesResponse.data; //esse codigo tras somente os dados que eu quero do endpoint, no caso somente o array de data.
      })
    );
  }
}
