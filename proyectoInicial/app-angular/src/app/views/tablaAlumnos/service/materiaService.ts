import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Materia } from "../../../../interfaces/materia.interface"
import { environment } from "../../../../environments/environment";

@Injectable
(
    {
        providedIn : 'root'
    }
)
export class MateriaService
{
    private http = inject(HttpClient);
    private apiUrl =  environment.APIURL+environment.ENDPOINT_MATERIA;

    getMaterias(): Observable<Materia[]> {
        return this.http.get<Materia[]>(this.apiUrl);
    }
}