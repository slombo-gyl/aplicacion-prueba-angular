import { HttpClient, httpResource } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { AlumnoResponse } from "../interfaces/response/alumno.response";
import { of, throwError } from "rxjs";
import { PuntajeResponse } from "../interfaces/response/puntaje.response";
import { CargarNotaRequest } from "../interfaces/request/cargar-nota.request";
import { Alumno } from "../views/alumnos/alumno";

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private BASE_URL = 'http://localhost:8080/api';
  private http = inject(HttpClient);

  private _alumnos = signal<AlumnoResponse[]>([]);

  alumnos = this._alumnos.asReadonly();
  puntajes = signal<PuntajeResponse[]>([]);


  getPuntajesList(): Observable<PuntajeResponse[]> {
  return this.http
    .get<any[]>(`${this.BASE_URL}/puntajes`)
    .pipe(
      map((puntajesDesdeBack) => {
        return puntajesDesdeBack.map((p) => ({
          ...p,
          alumnoId: p.estudianteId,
        }));
      }),
      tap((puntajesDesdeBack) => {
        this.puntajes.set(puntajesDesdeBack);
      }),
    );
  }

  getPuntajes(id: number): Observable<PuntajeResponse[]> {
  return this.http
    .get<any[]>(`${this.BASE_URL}/puntajes/estudiante/${id}`)
    .pipe(
      map((puntajesDesdeBack) => {
        return puntajesDesdeBack.map((p) => ({
          ...p,
          alumnoId: p.estudianteId,
        }));
      }),
      tap((puntajesDesdeBack) => {
        this.puntajes.set(puntajesDesdeBack);
      }),
    );
}

  getAlumnos(): Observable<AlumnoResponse[]> {
    return this.http
      .get<AlumnoResponse[]>(`${this.BASE_URL}/students`)
      .pipe(
        tap((alumnosDesdeBack) => {
          this._alumnos.set(alumnosDesdeBack);
        }),
      );

  }

  crearAlumno(nuevoAlumno: AlumnoResponse): Observable<AlumnoResponse> {
    const alumnoEnviar = {
      ...nuevoAlumno,
      dni: parseInt(nuevoAlumno.dni.toString(), 10),
    };

    return this.http.post<AlumnoResponse>(`${this.BASE_URL}/students`, alumnoEnviar).pipe(
      tap((alumnoCreado) => {
        this._alumnos.update((listaActual) => [...listaActual, alumnoCreado]);
      }),
    );
  }

  cargarNota(alumnoId: number, materiaId: number, valor: number): Observable<PuntajeResponse> {
    const existeAlumno = this.alumnos().find((alumno) => alumno.id === alumnoId);
  if (!existeAlumno) {
    return throwError(() => new Error("El alumno no existe"));
  }


    const puntajeRequest = {
      estudianteId: alumnoId,
      materiaId: materiaId,
      valor: valor,
  };


   return this.http.post<any>(`${this.BASE_URL}/puntajes`, puntajeRequest).pipe(
  map((puntajeDesdeBack) => ({
    ...puntajeDesdeBack,
    alumnoId: puntajeDesdeBack.estudianteId,
  })),
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