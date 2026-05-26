import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../interfaces/alumno.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {
  private http = inject(HttpClient);
  private apiUrl = environment.APIURL+environment.ENDPOINT_ALUMNO; 

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

 getAlumnoByID(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/buscar/${id}`);
  }

  crearAlumno(nuevoAlumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.apiUrl}`, nuevoAlumno);
  }

  deleteAlumnoLogico(id: number): Observable<Alumno>{
    return this.http.delete<Alumno>(`${this.apiUrl}/${id}`);
  }
}