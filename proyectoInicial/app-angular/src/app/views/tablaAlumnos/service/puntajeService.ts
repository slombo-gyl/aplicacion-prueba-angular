import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Puntaje } from "../../../../interfaces/puntaje.interface"
import { Alumno } from "../../../../interfaces/alumno.interface"
import { Materia } from "../../../../interfaces/materia.interface";
import { environment } from "../../../../environments/environment";

@Injectable
(
    {
        providedIn : 'root'
    }
)
export class PuntajeService
{
    private http = inject(HttpClient);
    private apiUrl =  environment.APIURL+environment.ENDPOINT_PUNTAJE;

    getPuntajes(): Observable<Puntaje[]> {
        return this.http.get<Puntaje[]>(this.apiUrl);
    }

      crearPuntaje(nuevoPuntaje: Puntaje): Observable<Puntaje> {
        return this.http.post<Puntaje>(`${this.apiUrl}`, nuevoPuntaje);
      }

          getPuntajesDeAlumno(alumno: Alumno): Observable<Puntaje[]> {
        return this.http.get<Puntaje[]>(this.apiUrl+`/${alumno.id}`);
    }

    getPuntajeDeAlumnoYMateria(alumno: Alumno, materia: Materia): Observable<Puntaje[]> {
        return this.http.get<Puntaje[]>(this.apiUrl+`/${alumno.id}/${materia.id}`);
    }
}