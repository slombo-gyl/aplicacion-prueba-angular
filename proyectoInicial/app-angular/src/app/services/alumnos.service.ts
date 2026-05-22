import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AlumnoModel } from "../interfaces/models/alumno.model";
import { PuntajeModel } from "../interfaces/models/puntaje.model";
import { AlumnoResponse } from "../interfaces/response/alumno.response";
import { of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private BASE_URL = 'http://localhost:8080/api';
  private http = inject(HttpClient);

  puntajes = signal<PuntajeModel[]>([]);

  alumnos = signal<AlumnoResponse[]>([]);

  getAlumnos(): Observable<AlumnoResponse[]> {
    return this.http
      .get<AlumnoResponse[]>(`${this.BASE_URL}/students`)
      .pipe(tap((alumnosBack) => this.alumnos.set(alumnosBack)));
  }

  crearAlumno(nuevoAlumno: AlumnoResponse): Observable<AlumnoResponse> {
    const alumnoEnviar = {
      ...nuevoAlumno,
      dni: parseInt(nuevoAlumno.dni.toString(), 10),
    };

    return this.http.post<AlumnoResponse>(`${this.BASE_URL}/students`, alumnoEnviar).pipe(
      tap((alumnoCreado) => {
        this.alumnos.update((listaActual) => [...listaActual, alumnoCreado]);
      }),
    );
  }

  cargarNota(alumnoId: number, materiaId: number, valor: number): Observable<PuntajeModel> {
    const existeAlumno = this.alumnos().find((alumno) => alumno.id === alumnoId);
    if (!existeAlumno) {
        return throwError(() => new Error("El alumno no existe"));
    }


    const puntajeRequest = {
      estudianteId: alumnoId,
      materiaId: materiaId,
      valor: valor,
    };


    return this.http.post<PuntajeModel>(`${this.BASE_URL}/puntajes`, puntajeRequest).pipe(
      tap((puntajeDesdeBack) => {

        this.puntajes.update((listaActual) => {

          const index = listaActual.findIndex(
            (p) => p.alumnoId === alumnoId && p.materiaId === materiaId,
          );

          if (index !== -1) {

            const existente = [...listaActual];
            existente[index] = puntajeDesdeBack;
            return existente;
          } else {
            return [...listaActual, puntajeDesdeBack];
          }
        });
      }),
    );
  }
}