import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from "@angular/router";
import { Formulario } from '../../components/formulario/formulario';
import { FormularioNota } from '../../components/formulario-notas/formulario-notas';
import { Alumno } from '../../../interfaces/alumno.interface';
import { AlumnoService } from './service/alumnoService';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, Formulario, FormularioNota],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class TableComponent implements OnInit {
  
  private service = inject(AlumnoService);

  alumnoSeleccionadoId = signal<number | null>(null);

  alumnos = signal<Alumno[]>([]);

  mostrarFormulario = signal(false);
  mostrarFormularioNota = signal(false);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.callPage();
  }

  callPage(): void {
    this.service.getAlumnos().subscribe({
      next: (res) => {
        console.log('Alumnos recibidos:', res);
        this.alumnos.set(res);
      },
      error: (err) => {
        console.error('Error al traer alumnos:', err);
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  abrirFormulario() {
    this.mostrarFormulario.set(true);
  }

  abrirFormularioNota(id : number) {
    this.alumnoSeleccionadoId.set(id);
    this.mostrarFormularioNota.set(true);
  }

  cerrarFormulario() {
    this.mostrarFormulario.set(false);
    this.mostrarFormularioNota.set(false);
    this.alumnoSeleccionadoId.set(null);
  }

  verAlumno(id: number) {
    this.service.getAlumnoByID(id).subscribe((res) => {
      console.log("Ver alumno:", res);
    });
  }

eliminarBajaLogica(id: number) {
    this.service.deleteAlumnoLogico(id).subscribe({
      next: (res: any) => {
        console.log("Estado del alumno actualizado con éxito: ", res);
        this.callPage(); 
      },
      error: (err) => {
        console.error("Error al intentar cambiar el estado del alumno:", err);
      }
    });
  }
}