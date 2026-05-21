import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlumnoModel } from '../../interfaces/models/alumno.model';
import { MateriaModel } from '../../interfaces/models/materia.model';
import { AlumnosService } from '../../services/alumnos.service';

import { z } from 'zod';

const notaSchema = z.object({
  nota: z.number({ message: 'Debe ingresar una nota' }).min(1, 'Minimo es 1').max(10, 'Maximo es 10'),
});

@Component({
  selector: 'app-formulario-notas',
  imports: [FormsModule],
  templateUrl: './formulario-notas.html',
  styleUrl: './formulario-notas.css',
})
export class FormularioNotas implements OnInit {
  alumnosService = inject(AlumnosService);

  alumno = input.required<AlumnoModel>();
  materia = input.required<MateriaModel>();
  cerrar = output<void>();

  valorNota: number | null = null;
  errors: Record<string, string[]> = {};

  ngOnInit() {
    const notaActual = this.obtenerNota();
    if (notaActual !== null) {
      this.valorNota = notaActual;
    }
  }

  obtenerNota(): number | null {
    const existePuntaje = this.alumnosService.puntajes().find(
      puntaje => puntaje?.alumnoId === this.alumno().id && puntaje.materiaId === this.materia().id
    );
    return existePuntaje ? existePuntaje.valor : null;
  }

  guardarNota() {
    const result = notaSchema.safeParse({ nota: this.valorNota });

    if (!result.success) {
      this.errors = result.error.flatten().fieldErrors;
      return;
    }

    this.errors = {};
    this.alumnosService.cargarNota(this.alumno().id, this.materia().id, result.data.nota);
    this.cerrar.emit();
  }

  onCerrar() {
    this.cerrar.emit();
  }
}
