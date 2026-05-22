import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AlumnosService } from '../../services/alumnos.service';
import { FormularioNotas } from '../formulario-notas/formulario-notas';
import { MateriasService } from '../../services/materias.service';
import { AlumnoResponse } from '../../interfaces/response/alumno.response';
import { MateriaResponse } from '../../interfaces/response/materia.response';

@Component({
  selector: 'app-detalle-alumno',
  imports: [TableModule, FormularioNotas],
  templateUrl: './detalle-alumno.html',
  styleUrl: './detalle-alumno.css',
})
export class DetalleAlumno implements OnInit {
  alumnosService = inject(AlumnosService);
  private materiasService = inject(MateriasService);
  alumno = input.required<AlumnoResponse>();
  cerrar = output<void>();

  materias = computed(() => this.materiasService.materias());

  ngOnInit() {
    this.materiasService.getMaterias().subscribe();
    this.alumnosService.getPuntajes(this.alumno().id).subscribe();
  }

  mostrarFormularioNotas = signal(false);
  materiaSeleccionada = signal<MateriaResponse | null>(null);

  obtenerNota(materiaId: number): number | null {
    const existePuntaje = this.alumnosService.puntajes().find(
      puntaje => puntaje?.alumnoId === this.alumno().id && puntaje.materiaId === materiaId
    );
    return existePuntaje ? existePuntaje.valor : null;
  }

  cargarNota(materia: MateriaResponse) {
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
