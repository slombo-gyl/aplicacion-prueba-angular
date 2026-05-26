import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ChartResponse{
    labels : string[];
    data: number[];
}


@Injectable({
  providedIn: 'root'
})

export class EstudiantesService{
    private apiUrl = 'http://localhost:8080/api/puntajes';

    constructor(private http: HttpClient){}

    getChart():Observable<ChartResponse> {
        return this.http.get<ChartResponse>(`${this.apiUrl}/chart`)
    }
}