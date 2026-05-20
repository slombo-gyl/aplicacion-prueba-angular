import { Component, computed, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from "@angular/router";
import { Formulario } from '../../components/formulario/formulario';
import { AlumnoService } from '../../services/alumnos.service';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [TableModule, Formulario],
  templateUrl: './alumno.html',
  styleUrl: './alumno.css'
})
export class Alumno {
  private router = inject(Router);
  alumnoService = inject(AlumnoService);

  alumnos = computed(() => this.alumnoService.alumnos());

  navigateToHome() {
    this.router.navigate([''])
  }

  mostrarFormulario = signal(false);

  abrirFormulario() {
    this.mostrarFormulario.set(true);
  }

  cerrarFormulario() {
    this.mostrarFormulario.set(false);
  }
}