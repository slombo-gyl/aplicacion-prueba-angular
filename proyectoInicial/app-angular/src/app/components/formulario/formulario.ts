import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AlumnosService } from '../../services/alumnos.service';

import { z } from 'zod';
import { AlumnoModel } from '../../interfaces/models/alumno.model';

const userSchema = z.object({
  nombre: z.string().min(3, 'Nombre inválido'),
  apellido: z.string().min(3, 'Apellido inválido'),
  email: z.email('Email inválido'),
  dni: z.string().regex(/^\d{8}$/, 'DNI inválido'),
});

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  errors: Record<string, string[]> = {};

  // Declaramos el evento de salida
  cerrar = output<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alumnosService: AlumnosService,
  ) {
    this.form = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      dni: [''],
    });
  }

  onCerrar() {
    this.cerrar.emit();
  }

  onSubmit() {
    const result = userSchema.safeParse(this.form.value);

    if (!result.success) {
      this.errors = result.error.flatten().fieldErrors;

      return;
    }

    this.errors = {};

    this.alumnosService.crearAlumno(result.data as AlumnoModel).subscribe({
      next: (alumnoCreado) => {
        console.log('Alumno guardado en el servidor:', alumnoCreado);
        this.onCerrar();
      },
      error: (err) => {
        console.error('Error al guardar el alumno:', err);
        alert('No se pudo guardar el alumno. Revisá la consola o el Backend.');
      },
    });
  }
}
