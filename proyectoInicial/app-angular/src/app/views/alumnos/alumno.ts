import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from "@angular/router";
import { Formulario } from '../../components/formulario/formulario';
import { AlumnosService } from '../../services/alumnos.service';
import { DetalleAlumno } from '../../components/detalle-alumno/detalle-alumno';
import { AlumnoResponse } from '../../interfaces/response/alumno.response';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [TableModule, Formulario, DetalleAlumno],
  templateUrl: './alumno.html',
  styleUrl: './alumno.css'
})
export class Alumno implements OnInit {
  private router = inject(Router);
  alumnoService = inject(AlumnosService);

  alumnos = computed(() => this.alumnoService.alumnos());

  alumnoDetalle = signal<AlumnoResponse | null>(null);

  mostrarFormulario = signal(false);
  mostrarDetalleAlumno = signal(false);


  ngOnInit() {
    this.alumnoService.getAlumnos().subscribe({
      next: (data: AlumnoResponse[]) => console.log('Alumnos cargados correctamente', data.length),
      error: (error: any) => console.error('Error al cargar alumnos: ', error)
    });
  }

  navigateToHome() {
    this.router.navigate([''])
  }

  abrirFormulario() {
    this.mostrarFormulario.set(true);
  }

  cerrarFormulario() {
    this.mostrarFormulario.set(false);
  }

  verDetalleAlumno(alumno: AlumnoResponse) {
    this.alumnoDetalle.set(alumno);
    this.mostrarDetalleAlumno.set(true);
  }

  cerrarDetalleAlumno() {
    this.mostrarDetalleAlumno.set(false);
    this.alumnoDetalle.set(null);
  }

  promedioAlumno(alumno: AlumnoResponse): string {
    const puntajesAlumno = this.alumnoService.puntajes().filter(puntaje => puntaje.alumnoId === alumno.id);
    const cantidad = puntajesAlumno.length;
    if (cantidad === 0) {
      return 'Sin notas';
    }
    const sumatoria = puntajesAlumno.reduce((acc, curr) => acc + curr.valor, 0);
    const promedio = sumatoria / cantidad;
    const promedioFormateado = promedio % 1 === 0 ? promedio.toFixed(0) : promedio.toFixed(2);
    return `${promedioFormateado} (${cantidad})`;
  }
}
