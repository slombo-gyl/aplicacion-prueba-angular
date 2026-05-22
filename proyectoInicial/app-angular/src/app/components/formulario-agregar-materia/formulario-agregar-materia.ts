import { Component, effect, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MateriasService } from '../../services/materias.service';
import { z } from 'zod';
import { MateriaResponse } from '../../interfaces/response/materia.response';

const materiaSchema = z.object({
  nombre: z.string().min(3, 'Nombre minimo 3 caracteres').max(50, 'Nombre maximo 50 caracteres'),
});

@Component({
  selector: 'app-formulario-agregar-materia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-agregar-materia.html',
  styleUrl: './formulario-agregar-materia.css',
})
export class FormularioAgregarMateria {
  private fb = inject(FormBuilder);
  private materiasService = inject(MateriasService);

  errors: Record<string, string[]> = {};
  cerrar = output<void>();
  form: FormGroup;
  materia = input<MateriaResponse | null>(null);

  constructor() {
    this.form = this.fb.group({
      nombre: [''],
    });

    effect(() => {
      const materiaActual = this.materia();
      if (materiaActual) {
        this.form.patchValue({ nombre: materiaActual.nombre });
      } else {
        this.form.patchValue({ nombre: '' });
      }
    });
  }

  onCerrar() {
    this.cerrar.emit();
  }

  onSubmit() {
    const result = materiaSchema.safeParse(this.form.value);

    if (!result.success) {
      this.errors = result.error.flatten().fieldErrors;
      return;
    }

    const nombreMateria = result.data.nombre;
    const materiaActual = this.materia();
    
    this.errors = {};

    if (materiaActual) {
      this.materiasService.putMateria(materiaActual.id, {nombre: nombreMateria}).subscribe({
        next: () => this.onCerrar(),
        error: (error) => {
          console.error('Error al actualizar materia: ', error);
          this.errors = { nombre: ['Error al actualizar la materia'] };
        }
      });
    } else {
      this.materiasService.postMateria({nombre: nombreMateria}).subscribe({
        next: () => this.onCerrar(),
        error: (error) => {
          console.error('Error al crear materia: ', error);
          this.errors = { nombre: ['Error al crear la materia'] };
        }
      });
    }
  }
}
