import { Component, computed, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from "@angular/router";
import { Formulario } from '../../components/formulario/formulario';
import { AlumnosService } from '../../services/alumnos.service';
import { DetalleAlumno } from '../../components/detalle-alumno/detalle-alumno';
import { AlumnoModel } from '../../interfaces/models/alumno.model';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [TableModule, Formulario, DetalleAlumno],
  templateUrl: './alumno.html',
  styleUrl: './alumno.css'
})
export class Alumno {
  private router = inject(Router);
  alumnoService = inject(AlumnosService);

  alumnos = computed(() => this.alumnoService.alumnos());

  alumnoDetalle = signal<AlumnoModel | null>(null);

  mostrarFormulario = signal(false);
  mostrarDetalleAlumno = signal(false);

  navigateToHome() {
    this.router.navigate([''])
  }

  abrirFormulario() {
    this.mostrarFormulario.set(true);
  }

  cerrarFormulario() {
    this.mostrarFormulario.set(false);
  }

  verDetalleAlumno(alumno: AlumnoModel) {
    this.alumnoDetalle.set(alumno);
    this.mostrarDetalleAlumno.set(true);
  }
  
  cerrarDetalleAlumno() {
    this.mostrarDetalleAlumno.set(false);
    this.alumnoDetalle.set(null);
  }

  promedioAlumno(alumno: AlumnoModel): string {
    const puntajesAlumno = this.alumnoService.puntajes().filter(puntaje =>  puntaje.alumnoId === alumno.id);
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
