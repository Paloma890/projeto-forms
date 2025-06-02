import { IBaseContriesResponse } from "../base-countries-response.interface";

export interface ICitiesResponse extends IBaseContriesResponse {
    data: string[]
}
