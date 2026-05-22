import { Component, inject, OnInit, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MateriaService } from '../../views/tablaAlumnos/service/materiaService';
import { z } from 'zod';

const userSchema = z.object({
  materia: z.string().min(1, 'materia inválido'),
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

  errors: Record<string, string[]> = {};
  cerrar = output<void>();

  //aca se guardaran las materias que vengan de la base de datos
  materias = signal<string[]>([])
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      materia: [''],
      nota: [''],
    });
  }

  ngOnInit(): void 
  {
    //apenas se abra el formulario, cargamos las materias de la BD
    this.cargarMaterias();
  }

  cargarMaterias()
  {
    this.service.getMaterias().subscribe
    ({
        next: (data) => 
        {
          this.materias.set(data.map(materia => materia.nombre));
          // Llenamos el Signal con las materias
        },
        error: (err) => 
        {
          console.error('Error al traer materias, ', err);
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
    console.log('Formulario válido');
    console.log(result.data);
    this.onCerrar();
  }
}