import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MateriasService, Materia, RegistrarPuntajePayload } from '../../services/materias';
import { Alumno } from '../tablaAlumnos/service/alumnoServis';

@Component({
  selector: 'app-notas-alumno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notas-alumno.html',
  styleUrl: './notas-alumno.css',
})
export class NotasAlumno implements OnInit {
  private router = inject(Router);
  private materiasService = inject(MateriasService);

  alumno = signal<Alumno | any>(null);
  materias = signal<Materia[]>([]);

  ngOnInit() {
    const estadoNav = history.state;
    if (estadoNav && estadoNav.alumno) {
      this.alumno.set(estadoNav.alumno);
    } else {
      this.router.navigate(['/alumnos']);
    }

    this.cargarMaterias();
  }

  cargarMaterias() {
    this.materiasService.getMaterias().subscribe({
      next: (data) => this.materias.set(data),
      error: (err) => console.error('Error al cargar materias', err)
    });
  }

  guardarNota(materiaId: number, valorInput: string) {
    if (!valorInput) return; 
    
    const notaNum = parseFloat(valorInput);
    const datosAlumno = this.alumno();

    if (datosAlumno) {
      const payload: RegistrarPuntajePayload = {
        estudianteId: Number(datosAlumno.id || datosAlumno.dni), 
        materiaId: materiaId,
        valor: notaNum
      };

      this.materiasService.cargarNota(payload).subscribe({
        next: () => alert('Nota guardada con éxito'),
        error: (err) => console.error('Error al guardar la nota', err)
      });
    }
  }

  volver() {
    this.router.navigate(['/alumnos']);
  }
}