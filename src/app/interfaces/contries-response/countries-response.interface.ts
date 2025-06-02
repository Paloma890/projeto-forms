import { IBaseContriesResponse } from "../base-countries-response.interface";
import { ICountry } from "./country.interface";

export interface ICountriesResponse  extends IBaseContriesResponse{
    data: ICountry[];
}
