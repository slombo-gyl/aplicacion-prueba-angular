import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Materia } from "../../../../interfaces/materia.interface"

@Injectable
(
    {
        providedIn : 'root'
    }
)
export class MateriaService
{
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/materias';

    getMaterias(): Observable<Materia[]> {
        return this.http.get<Materia[]>(this.apiUrl);
    }
}