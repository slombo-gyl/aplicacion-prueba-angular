import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../views/tablaAlumnos/service/alumnoService';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { z } from 'zod';

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
  private alumnoService = inject(AlumnoService)
  errors: Record<string, string[]> = {};

  // Declaramos el evento de salida
  cerrar = output<void>();
  alumnoGuardado = output<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
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

  // Si llegó acá, los datos son 100% válidos según Zod
    this.errors = {};
    console.log('Formulario válido, enviando al backend:', result.data);

    // 3. Enviamos los datos validados (result.data) directamente al servicio
    this.alumnoService.crearAlumno(result.data).subscribe({
      next: (alumnoCreado) => {
        console.log('¡Alumno guardado con éxito en la BD!', alumnoCreado);
        
        this.alumnoGuardado.emit(); // Avisamos a la tabla que se creó un alumno para que se refresque
        this.form.reset();         // Limpiamos los casilleros del formulario
        this.onCerrar();           // Cerramos el modal
      },
      error: (error) => {
        console.error('Error al intentar guardar el alumno:', error);
      }
    });
  
  }
}