import { Component, inject, input, effect, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AlumnoModel } from '../../interfaces/models/alumno.model';
import { MateriaModel } from '../../interfaces/models/materia.model';
import { AlumnosService } from '../../services/alumnos.service';

import { z } from 'zod';

const notaSchema = z.object({
  nota: z.number({ message: 'Debe ingresar una nota' }).min(1, 'Minimo es 1').max(10, 'Maximo es 10'),
});

@Component({
  selector: 'app-formulario-notas',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-notas.html',
  styleUrl: './formulario-notas.css',
})
export class FormularioNotas {
  alumnosService = inject(AlumnosService);
  private fb = inject(FormBuilder);

  alumno = input.required<AlumnoModel>();
  materia = input.required<MateriaModel>();
  cerrar = output<void>();

  form!: FormGroup;
  errors: Record<string, string[]> = {};

  constructor() {
    this.form = this.fb.group({
      nota: [null]
    });

    effect(() => {
      const notaActual = this.obtenerNota();
      if (notaActual !== null) {
        this.form.patchValue({ nota: notaActual }, { emitEvent: false });
      }
    });
  }

  obtenerNota(): number | null {
    const existePuntaje = this.alumnosService.puntajes().find(
      puntaje => puntaje?.alumnoId === this.alumno().id && puntaje.materiaId === this.materia().id
    );
    return existePuntaje ? existePuntaje.valor : null;
  }

  guardarNota() {
    const notaForm = this.form.value.nota;
    const result = notaSchema.safeParse({ 
      nota: notaForm !== null && notaForm !== '' ? Number(notaForm) : undefined 
    });

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
