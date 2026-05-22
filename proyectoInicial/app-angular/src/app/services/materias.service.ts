import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MateriaResponse } from "../interfaces/response/materia.response";
import { Observable, tap } from "rxjs";
import { CrearMateriaRequest } from "../interfaces/request/crear-materia.request";

@Injectable({
    providedIn: 'root'
})
export class MateriasService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/materias';

    private _materias = signal<MateriaResponse[]>([]);

    materias = this._materias.asReadonly();

    getMaterias(): Observable<MateriaResponse[]> {
        return this.http.get<MateriaResponse[]>(this.apiUrl).pipe(
            tap((data: MateriaResponse[]) => this._materias.set(data))
        );
    }

    getMateriaById(id: number): Observable<MateriaResponse> {
        return this.http.get<MateriaResponse>(`${this.apiUrl}/${id}`);
    }

    postMateria(crearMateriaRequest: CrearMateriaRequest): Observable<MateriaResponse> {
        return this.http.post<MateriaResponse>(this.apiUrl, crearMateriaRequest).pipe(
            tap(
                (nuevaMateria: MateriaResponse) => {
                    this._materias.update((materias: MateriaResponse[]) => [...materias, nuevaMateria]);
                }
            )
        );
    }

    putMateria(id: number, actualizarMateriaRequest: CrearMateriaRequest): Observable<MateriaResponse> {
        return this.http.put<MateriaResponse>(`${this.apiUrl}/${id}`, actualizarMateriaRequest).pipe(
            tap(
                (materiaActualizada: MateriaResponse) =>
                    this._materias.update((materias: MateriaResponse[]) =>
                        materias.map(materia => materia.id === id ? materiaActualizada : materia))

            )
        );
    }

    deleteMateria(id: number): Observable<MateriaResponse> {
        return this.http.delete<MateriaResponse>(`${this.apiUrl}/${id}`).pipe(
            tap(
                () => {
                    this._materias.update((materias: MateriaResponse[]) =>
                        materias.filter(materia => materia.id !== id)
                    );
                }
            )
        );
    }
}