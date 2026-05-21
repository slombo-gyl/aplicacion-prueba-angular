import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { AlumnoModel } from "../interfaces/models/alumno.model";
import { PuntajeModel } from "../interfaces/models/puntaje.model";

@Injectable({
    providedIn: 'root'
})

export class AlumnosService {
    private BASE_URL = 'http://localhost:8080'
    private http = inject(HttpClient);

    private ALUMNOS_DATA: AlumnoModel[] = [
        { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com' , dni: '12345678' },
        { id: 2, nombre: 'María García', apellido: 'García', email: 'maria@example.com', dni: '87654321' },
        { id: 3, nombre: 'Carlos López', apellido: 'López', email: 'carlos@example.com', dni: '11223344' },
        { id: 4, nombre: 'Ana Martínez', apellido: 'Martínez', email: 'ana@example.com', dni: '44332211' }
    ];

    puntajes = signal<PuntajeModel[]>([]);

    alumnos = signal<AlumnoModel[]>(this.ALUMNOS_DATA);

    getAlumnos(): Observable<AlumnoModel[]> {
        return this.http.get<AlumnoModel[]>(`${this.BASE_URL}/alumno`);
    }

    crearAlumno(nuevoAlumno: AlumnoModel): Observable<AlumnoModel> {
        return this.http.post<AlumnoModel>(`${this.BASE_URL}/alumno`, nuevoAlumno);
    }

    cargarNota(alumnoId: number, materiaId: number, valor: number) {
        const existeAlumno = this.alumnos().find(alumno => alumno.id === alumnoId);
        if (!existeAlumno) return;

        this.puntajes.update(listaPuntaje => {
            const index = listaPuntaje.findIndex(
                puntaje => puntaje.alumnoId === alumnoId && puntaje.materiaId === materiaId
            );
            if (index !== -1) {
                const copia = [...listaPuntaje];
                copia[index] = {
                    ...copia[index],
                    valor
                };
                return copia;
            } else {
                const nuevoPuntaje: PuntajeModel = {
                    id: listaPuntaje.length + 1,
                    valor,
                    alumnoId,
                    materiaId
                };
                return [...listaPuntaje, nuevoPuntaje];
            }
        });
    }


}