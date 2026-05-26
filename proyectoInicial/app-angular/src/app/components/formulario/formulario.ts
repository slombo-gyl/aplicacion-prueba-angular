import { Component, effect, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { z } from 'zod';

const userSchema = z.object({
  nombre: z.string('Nombre requerido').min(2, 'Nombre inválido'),
  apellido: z.string('Apellido requerido').min(2, 'Apellido inválido'),
  email: z.email('Email inválido'),
  dni: z.string('DNI requerido').regex(/^\d{7,8}$/, 'DNI inválido'),
});

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {

  modo = input<'registrar' | 'editar'>('registrar');
  alumno = input<any>(null);
  cerrar = output<void>();
  guardar = output<any>();
  errors: Record<string, string[]> = {};
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      dni: [''],
    });

    effect(() => {
      if (this.alumno()) {
        this.form.patchValue(this.alumno());
      } else {
        this.form.reset();
      }
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
    this.guardar.emit(result.data);
    this.onCerrar();
  }
}