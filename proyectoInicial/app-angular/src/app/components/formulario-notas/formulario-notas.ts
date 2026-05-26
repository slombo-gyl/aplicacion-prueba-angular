import { Component, inject, OnInit, signal, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MateriaService } from '../../views/tablaAlumnos/service/materiaService';
import { PuntajeService } from '../../views/tablaAlumnos/service/puntajeService';
import { Materia } from '../../../interfaces/materia.interface';
import { z } from 'zod';

const userSchema = z.object({
  materiaId: z.coerce.number().min(1, 'Materia inválida'),
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
  private service = inject(MateriaService);
  private puntajeService = inject(PuntajeService);

  errors: Record<string, string[]> = {};
  estudianteId = input.required<number>();
  cerrar = output<void>();
  notaGuardada = output<void>();

  materias = signal<Materia[]>([]);
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      materiaId: [''],
      nota: [''],
    });
  }

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.service.getMaterias().subscribe
    ({
        next: (data) => {this.materias.set(data);},
        error: (err) => {console.error('Error al traer materias, ', err);}
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
    this.puntajeService
      .crearPuntaje({
        estudianteId: this.estudianteId(),
        materiaId: result.data.materiaId,
        valor: result.data.nota,
      })
      .subscribe({
        next: () => {
          this.notaGuardada.emit();
          this.onCerrar();
        },
        error: (err) => {
          console.error('Error al cargar la nota:', err);
        },
      });
  }
}
