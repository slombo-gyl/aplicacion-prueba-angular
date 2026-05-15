import { Component, output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { z } from 'zod';

const notaSchema = z.object({
  alumnoDni: z.string().min(1, 'Debe seleccionar un alumno'),
  nota: z.string().min(1, 'Nota inválida'),
});

@Component({
  selector: 'app-formulario-notas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-notas.html',
  styleUrl: './formulario-notas.css',
})
export class FormularioNotas {
  @Input() alumnos: any[] = [];
  errors: Record<string, string[]> = {};

  // Declaramos el evento de salida
  cerrar = output<void>();
  guardarNota = output<{ dni: string, nota: number }>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      alumnoDni: [''],
      nota: [''],
    });
  }

  onCerrar() {
    this.cerrar.emit();
  }

  onSubmit() {
    const result = notaSchema.safeParse(this.form.value);

    if (!result.success) {
      this.errors = result.error.flatten().fieldErrors;

      return;
    }

    this.errors = {};

    console.log('Formulario válido');
    console.log(result.data);

    this.guardarNota.emit({
      dni: result.data.alumnoDni,
      nota: Number(result.data.nota)
    });

    this.onCerrar();
  }
}
