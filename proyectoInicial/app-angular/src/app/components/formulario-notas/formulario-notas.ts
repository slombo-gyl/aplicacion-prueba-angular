import { Component, inject, OnInit, signal, output, afterNextRender, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AlumnoService } from '../../views/tablaAlumnos/service/alumnoService';
import { z } from 'zod';

interface Materia {
  id: number;
  nombre: string;
}

const userSchema = z.object({
  materiaId: z.string().min(1, 'materia inválido'),
  nota: z.coerce.number().min(0, 'Nota inválida').max(10, 'La nota máxima es 10'),
});

@Component({
  selector: 'app-formulario-notas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-notas.html',
  styleUrl: './formulario-notas.css', 
})

export class FormularioNota implements OnInit {
  private fb = inject(FormBuilder);
  private serviceAlumno = inject(AlumnoService);

  alumnoId = input.required<number>();

  errors: Record<string, string[]> = {};
  cerrar = output<void>();

  materias = signal<Materia[]>([])

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      materiaId: [''],
      nota: [''],
    });
  }

  ngOnInit(): void 
  {
    this.cargarMaterias();
  }

  cargarMaterias()
  {
    this.serviceAlumno.getMaterias().subscribe
    ({
      next: (data) => this.materias.set(data),
      error: (err) => console.error(err)
    });
  }

  onCerrar() 
  {
    this.cerrar.emit();
  }

  onSubmit() 
  {
    const result = userSchema.safeParse(this.form.value);

    if (!result.success) {
      this.errors = result.error.flatten().fieldErrors;
      return;
    }

    this.errors = {};

    
    const datosPuntaje = {
      estudianteId: this.alumnoId() ,      
      materiaId: result.data.materiaId ,
      valor: parseFloat(result.data.nota.toString())
    };

    console.log('Enviando a la tabla Puntaje:', datosPuntaje);

    this.serviceAlumno.guardarPuntaje(datosPuntaje).subscribe({
      next: (res) => {
        console.log('¡Puntaje guardado con éxito!', res);
        this.onCerrar();
      },
      error: (err) => console.error('Error 500 al guardar puntaje:', err)
    });
  }
}
