import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MateriasService, Materia, RegistrarPuntajePayload, MateriaNotas } from '../../services/materias';
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

  materiasConNotas = signal<MateriaNotas[]>([]);

  ngOnInit() {
    this.obtenerAlumnoDesdeNavigation();
  }

  obtenerAlumnoDesdeNavigation() {
    const estadoNav = history.state;

    if (estadoNav && estadoNav.alumno) {
      this.alumno.set(estadoNav.alumno);
      this.cargarMaterias();
      this.cargarNotasDelAlumno();
    } else {
      this.router.navigate(['/alumnos']);
    }
  }

  cargarMaterias() {
    this.materiasService.getMaterias().subscribe({
      next: (data) => this.materias.set(data),
      error: (err) => console.error('Error al cargar materias', err),
    });
  }

  cargarNotasDelAlumno() {
    const datosAlumno = this.alumno();
    if (datosAlumno) {
      const estudianteId = Number(datosAlumno.id || datosAlumno.dni);
      this.materiasService.getPuntajesPorEstudiante(estudianteId).subscribe({
        next: (data) => this.materiasConNotas.set(data),
        error: (err) => console.error('Error al cargar notas', err),
      });
    }
  }

  obtenerNotasMateria(nombreMateria: string): number[] {
    const materiaEncontrada = this.materiasConNotas().find(
      (m) => m.nombreMateria === nombreMateria,
    );
    return materiaEncontrada ? materiaEncontrada.notas : [];
  }

  guardarNota(materiaId: number, valorInput: string, inputElement: HTMLInputElement) {
    if (!valorInput) return;

    const notaNum = parseFloat(valorInput);
    const datosAlumno = this.alumno();

    if (datosAlumno) {
      const payload: RegistrarPuntajePayload = {
        estudianteId: Number(datosAlumno.id || datosAlumno.dni),
        materiaId: materiaId,
        valor: notaNum,
      };

      this.materiasService.cargarNota(payload).subscribe({
        next: () => {
          alert('Nota guardada con éxito');
          this.cargarNotasDelAlumno();
          inputElement.value = '';
        },
        error: (err) => console.error('Error al guardar la nota', err),
      });
    }
  }

  volver() {
    this.router.navigate(['/alumnos']);
  }
}
