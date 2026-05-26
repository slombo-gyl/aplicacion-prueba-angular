import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface ChartResponse{
    labels : string[];
    data: number[];
}

@Injectable({
  providedIn: 'root'
})

export class EstudiantesService{
    private apiUrl = environment.APIURL+environment.ENDPOINT_PUNTAJE

    constructor(private http: HttpClient){}

    getChart():Observable<ChartResponse> {
        return this.http.get<ChartResponse>(`${this.apiUrl}/chart`)
    }
}