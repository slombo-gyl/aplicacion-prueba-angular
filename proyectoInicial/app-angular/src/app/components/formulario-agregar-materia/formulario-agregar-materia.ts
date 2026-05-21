import { Component, effect, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MateriasService } from '../../services/materias.service';
import { z } from 'zod';
import { MateriaModel } from '../../interfaces/models/materia.model';

const materiaSchema = z.object({
  nombreMateria: z.string().min(3, 'Nombre de materia inválido (mínimo 3 caracteres)'),
});

@Component({
  selector: 'app-formulario-agregar-materia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-agregar-materia.html',
  styleUrl: './formulario-agregar-materia.css',
})
export class FormularioAgregarMateria {
  errors: Record<string, string[]> = {};
  cerrar = output<void>();
  form!: FormGroup;
  materia = input<MateriaModel | null>(null);

  constructor(private fb: FormBuilder, private materiasService: MateriasService) {
    this.form = this.fb.group({
      nombreMateria: [''],
    });

    effect(() => {
      const mat = this.materia();
      if (mat) {
        this.form.patchValue({ nombreMateria: mat.nombreMateria });
      } else {
        this.form.patchValue({ nombreMateria: '' });
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

    const nombreMateria = result.data.nombreMateria;
    const materiaActual = this.materia();

    if (this.materiasService.existeMateria(nombreMateria, materiaActual?.id)) {
      this.errors = { nombreMateria: ['La materia ya existe'] };
      return;
    }

    this.errors = {};
    if (materiaActual) {
      this.materiasService.actualizarMateria(materiaActual.id, nombreMateria);
    } else {
      this.materiasService.crearMateria(result.data);
    }
    this.onCerrar();
  }
}
