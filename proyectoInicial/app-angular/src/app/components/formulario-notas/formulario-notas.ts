import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { z } from 'zod';

const userSchema = z.object({
  materia: z.string().min(3, 'materia inválido'),
  nota: z.number(),
});

@Component({
  selector: 'app-formulario-notas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-notas.html',
  styleUrl: './formulario-notas.css',
})
export class FormularioNota {
  errors: Record<string, string[]> = {};

  // Declaramos el evento de salida
  cerrar = output<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      materia: [''],
      nota: [''],
    
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

    console.log('Formulario válido');
    console.log(result.data);
    this.onCerrar();
  }


}
