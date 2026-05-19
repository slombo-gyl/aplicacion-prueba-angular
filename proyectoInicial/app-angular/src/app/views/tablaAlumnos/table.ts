import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from "@angular/router";
import { Formulario } from '../../components/formulario/formulario';
import { AlumnoService, Alumno } from './service/alumnoServis'; 

@Component({
  selector: 'app-table',
  standalone: true,
  // Agregar los imports de este componente
  imports: [TableModule, Formulario, RouterLink],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class TableComponent implements OnInit{

  private alumnoService = inject(AlumnoService)

  constructor(private router: Router) { }

  alumnos = signal<Alumno[]>([])

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe({
      next: (data) => this.alumnos.set(data),
      error: (err) => console.error('Error al cargar alumnos', err)
    });
  }

  navigateToHome() {
    this.router.navigate([''])
  }

  // Estado del modal (equivalente a useState en React)
  mostrarFormulario = signal(false);

  abrirFormulario() {
    this.mostrarFormulario.set(true);
  }

  cerrarFormulario() {
    this.mostrarFormulario.set(false);
  }
}