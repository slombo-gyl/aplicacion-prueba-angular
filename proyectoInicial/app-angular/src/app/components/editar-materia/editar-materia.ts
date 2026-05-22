import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MateriasService } from '../../services/materias.service';
import { z } from 'zod';
import { MateriaResponse } from '../../interfaces/response/materia.response';

const materiaSchema = z.object({
  nombre: z.string().min(3, 'Nombre minimo 3 caracteres').max(50, 'Nombre maximo 50 caracteres'),
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

  materia = input.required<MateriaResponse>();
  cerrar = output<void>();

  form!: FormGroup;
  errors: Record<string, string[]> = {};

  constructor() {
    this.form = this.fb.group({
      nombre: ['']
    });

    effect(() => {
      const materiaActual = this.materia();
      if (materiaActual) {
        this.form.patchValue({ nombre: materiaActual.nombre }, { emitEvent: false });
      }
    });
  }

  guardarMateria() {
    const nombreForm = this.form.value.nombre?.trim();
    const result = materiaSchema.safeParse({ nombre: nombreForm });

    if (!result.success) {
      this.errors = result.error.flatten().fieldErrors;
      return;
    }

    this.errors = {};

    const nuevoNombre = result.data.nombre;

    this.materiasService.putMateria(this.materia().id, { nombre: nuevoNombre }).subscribe({
        next: () => {
          this.materia().nombre = nuevoNombre;
          this.cerrar.emit();
        },
        error: (error) => {
        console.error('Error al actualizar la materia: ', error);
        this.errors = { nombre: ['Error al actualizar la materia'] };
      }
    });
  }

  onCerrar() {
    this.cerrar.emit();
  }
}
