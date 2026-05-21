/*import { HttpClient } from "@angular/common/http";
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
        return this.http.get<Alumno[]>(`${this.BASE_URL}/api/students`);
    }

    getAlumnoByID(id: number): Observable<Alumno>{
        return this.http.get<Alumno>(`${this.BASE_URL}/api/students/${id}`);
    }

    crearAlumno(nuevoAlumno: Alumno): Observable<Alumno> {
        return this.http.post<Alumno>(`${this.BASE_URL}/alumno`, nuevoAlumno);
    }
}*/

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../interfaces/alumno.interface';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private http = inject(HttpClient);
  
  // Cambia esto por la URL exacta de tu endpoint "listarEstudiantes"
  private apiUrl = 'http://localhost:8080/api/students'; 

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  getAlumnoByID(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`); // Ajusta si tu backend usa otra ruta para el ID
  }

  crearAlumno(nuevoAlumno: Alumno): Observable<Alumno> {
        return this.http.post<Alumno>(`${this.apiUrl}`, nuevoAlumno);
    }
}