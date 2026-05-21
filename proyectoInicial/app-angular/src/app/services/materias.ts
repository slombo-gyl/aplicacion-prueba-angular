import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Materia {
    id: number;
    nombre: string;
    nota?: number;
}

export interface RegistrarPuntajePayload {
    estudianteId: number;
    materiaId: number;
    valor: number;
}

export interface MateriaNotas {
  nombreMateria: string;
  notas: number[];
}

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private materiasUrl = 'http://localhost:8080/api/materias';
  private puntajesUrl = 'http://localhost:8080/api/puntajes';

  constructor(private http: HttpClient) {}

  getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.materiasUrl);
  }

  cargarNota(payload: RegistrarPuntajePayload): Observable<any> {
    return this.http.post<any>(this.puntajesUrl, payload);
  }

  getPuntajesPorEstudiante(estudianteId: number): Observable<MateriaNotas[]> {
    return this.http.get<MateriaNotas[]>(`${this.puntajesUrl}/estudiante/${estudianteId}`);
  }
}
