import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../interfaces/alumno.interfaces';

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
    return this.http.post<Alumno>(`${this.apiUrl}/students`, nuevoAlumno);
  }

  deleteAlumnoLogico(id: number): Observable<Alumno>{
    return this.http.delete<Alumno>(`${this.apiUrl}/${id}`);
  }

  getMaterias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/materias`);
  }

  guardarPuntaje(datos: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/puntajes`, datos);
  }
}