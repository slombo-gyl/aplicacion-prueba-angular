import { Component, computed, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from "@angular/router";
import { Formulario } from '../../components/formulario/formulario';
import { AlumnoService } from '../../services/alumnos.service';
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
  alumnoService = inject(AlumnoService);

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
  }
}