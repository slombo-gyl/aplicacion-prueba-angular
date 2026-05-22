import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../views/tablaAlumnos/service/alumnoService';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { z } from 'zod';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'; 

const userSchema = z.object({
  nombre: z.string().min(3, 'Nombre inválido'),
  apellido: z.string().min(3, 'Apellido inválido'),
  email: z.email('Email inválido'),
  dni: z.string().regex(/^\d{8}$/, 'DNI inválido'),
});

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})

export class Formulario {
  private alumnoService = inject(AlumnoService)
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  errors: Record<string, string[]> = {};

  // Declaramos el evento de salida
  cerrar = output<void>();
  alumnoGuardado = output<void>();

  form!: FormGroup;
constructor() {
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
  // 💡 Esta es la propiedad directa y correcta que TypeScript adora:
  this.errors = result.error.flatten().fieldErrors as Record<string, string[]>;
  return;
}

  this.errors = {};
  console.log('Formulario válido, enviando al backend:', result.data);


    this.alumnoService.crearAlumno(result.data).subscribe({
      next: (response) => {
        
        this.messageService.add({
          key: 'formToast',
          severity: 'success',
          summary: '¡Alumno Registrado!',
          detail: `${result.data.nombre} se guardó correctamente.`,
          life: 2000 
        });

        setTimeout(() => {
          this.form.reset();             // Limpiamos los campos
          this.alumnoGuardado.emit();    //  Le avisa al componente Padre que refresque la tabla
          this.cerrar.emit();            //  Cierra el modal automáticamente
        }, 1500);
      },
      error: (err) => {
        // En caso de que falle la base de datos (Ej: DNI duplicado)
        this.messageService.add({
          key: 'formToast',
          severity: 'error',
          summary: 'Error al guardar',
          detail: 'Hubo un problema en el servidor. Intentelo de nuevo.'
        });
        console.error('Error en el backend:', err);
      }
    });
  }
}