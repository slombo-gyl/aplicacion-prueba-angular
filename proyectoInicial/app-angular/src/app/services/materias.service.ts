import { Injectable, signal } from "@angular/core";
import { MateriaModel } from "../interfaces/models/materia.model";

@Injectable({
    providedIn: 'root'
})
export class MateriasService {
    private MATERIAS_DATA: MateriaModel[] = [
        { id: 1, nombreMateria: 'Diseño' }
    ];

    materias = signal<MateriaModel[]>(this.MATERIAS_DATA);

    existeMateria(nombre: string, excluyendoId?: number): boolean {
        return this.materias().some(
            materia => materia.nombreMateria.toLowerCase().trim() === nombre.toLowerCase().trim() && materia.id !== excluyendoId
        );
    }

    crearMateria(nuevaMateria: Omit<MateriaModel, 'id'>) {
        this.materias.update(materias => {
            const id = materias.length > 0 ? materias[materias.length - 1].id + 1 : 1;
            return [...materias, { ...nuevaMateria, id }];
        });
    }

    actualizarMateria(id: number, nombreMateria: string) {
        this.materias.update(materias =>
            materias.map(materia => materia.id === id ? { ...materia, nombreMateria } : materia)
        );
    }
}