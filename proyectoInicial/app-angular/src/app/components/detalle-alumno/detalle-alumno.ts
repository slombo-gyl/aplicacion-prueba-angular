import { Component, inject, input, output, signal } from '@angular/core';
import { AlumnoModel } from '../../interfaces/models/alumno.model';
import { TableModule } from 'primeng/table';
import { AlumnosService } from '../../services/alumnos.service';
import { MateriaModel } from '../../interfaces/models/materia.model';
import { FormularioNotas } from '../formulario-notas/formulario-notas';

@Component({
  selector: 'app-detalle-alumno',
  imports: [TableModule, FormularioNotas],
  templateUrl: './detalle-alumno.html',
  styleUrl: './detalle-alumno.css',
})
export class DetalleAlumno {
  alumnosService = inject(AlumnosService);
  alumno = input.required<AlumnoModel>();
  cerrar = output<void>();

  materias = signal<MateriaModel[]>([
    { id: 1, nombreMateria: 'Diseño'}
  ]);

  mostrarFormularioNotas = signal(false);
  materiaSeleccionada = signal<MateriaModel | null>(null);

  obtenerNota(materiaId: number): number | null {
    const existePuntaje = this.alumnosService.puntajes().find(
      puntaje => puntaje?.alumnoId === this.alumno().id && puntaje.materiaId === materiaId
    );
    return existePuntaje? existePuntaje.valor : null;
  }

  cargarNota(materia: MateriaModel) {
    this.materiaSeleccionada.set(materia);
    this.mostrarFormularioNotas.set(true);
  }

  cerrarFormularioNotas() {
    this.mostrarFormularioNotas.set(false);
    this.materiaSeleccionada.set(null);
  }

  onCerrar() {
    this.cerrar.emit();
  }
}
