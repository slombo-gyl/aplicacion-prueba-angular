import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Alumno } from '../../../../interfaces/alumno.interfaces';



@Injectable({
    providedIn: 'root'
})

export class AlumnoService {
    private BASE_URL = 'http://localhost:8080'

    constructor(private http: HttpClient) { }

    getAlumnos(): Observable<Alumno[]> {
        return this.http.get<Alumno[]>(`${this.BASE_URL}/alumno`);
    }

    crearAlumno(nuevoAlumno: Alumno): Observable<Alumno> {
        return this.http.post<Alumno>(`${this.BASE_URL}/alumno`, nuevoAlumno);
    }
}