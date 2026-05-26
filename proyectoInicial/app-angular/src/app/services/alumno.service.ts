import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Alumno {
    id: number;
    nombre: string,
    apellido: string,
    dni: string,
    email: string,
}

@Injectable({
    providedIn: 'root'
})

export class AlumnoService {
    private BASE_URL = 'http://localhost:8080/api'

    constructor(private http: HttpClient) { }

    getAlumnos(): Observable<Alumno[]> {
        return this.http.get<Alumno[]>(`${this.BASE_URL}/estudiantes?size=1000`);
    }

    crearAlumno(nuevoAlumno: Alumno): Observable<Alumno> {
        return this.http.post<Alumno>(`${this.BASE_URL}/estudiantes`, nuevoAlumno);
    }
    actualizarAlumno(id: number, alumno: Alumno): Observable<Alumno> {
        return this.http.patch<Alumno>(`${this.BASE_URL}/estudiantes/${id}`, alumno);
    }
}