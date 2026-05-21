import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MateriaModel } from '../../interfaces/models/materia.model';
import { MateriasService } from '../../services/materias.service';
import { z } from 'zod';

const materiaSchema = z.object({
  nombreMateria: z.string().min(3, 'Nombre de materia inválido (mínimo 3 caracteres)'),
});

@Component({
  selector: 'app-editar-materia',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-materia.html',
  styleUrl: './editar-materia.css',
})
export class EditarMateria {
  private fb = inject(FormBuilder);
  private materiasService = inject(MateriasService);

  materia = input.required<MateriaModel>();
  cerrar = output<void>();

  form!: FormGroup;
  errors: Record<string, string[]> = {};

  constructor() {
    this.form = this.fb.group({
      nombreMateria: ['']
    });

    effect(() => {
      const mat = this.materia();
      if (mat) {
        this.form.patchValue({ nombreMateria: mat.nombreMateria }, { emitEvent: false });
      }
    });
  }

  guardarMateria() {
    const nombreForm = this.form.value.nombreMateria?.trim();
    const result = materiaSchema.safeParse({ nombreMateria: nombreForm });

    if (!result.success) {
      this.errors = result.error.flatten().fieldErrors;
      return;
    }

    const nuevoNombre = result.data.nombreMateria;

    if (this.materiasService.existeMateria(nuevoNombre, this.materia().id)) {
      this.errors = { nombreMateria: ['La materia ya existe'] };
      return;
    }

    this.errors = {};
    this.materiasService.actualizarMateria(this.materia().id, nuevoNombre);
    this.cerrar.emit();
  }

  onCerrar() {
    this.cerrar.emit();
  }
}
