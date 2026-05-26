import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import { Alumno } from '../../../interfaces/alumno.interface';
import { Formulario } from '../../components/formulario/formulario';
import { FormularioNota } from '../../components/formulario-notas/formulario-notas';
import { AlumnoService } from './service/alumnoService';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, Formulario, FormularioNota, Dialog, CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class TableComponent implements OnInit {
  private service = inject(AlumnoService);

  alumnos = signal<Alumno[]>([]);

  mostrarFormulario = signal(false);
  mostrarFormularioNota = signal(false);

  mostrarModalDetalles = signal(false);
  alumnoSeleccionado = signal<Alumno | null>(null);
  alumnoNotaId = signal<number | null>(null);
  pageLinks = signal(5);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.actualizarPageLinks();
    this.callPage();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.actualizarPageLinks();
  }

  private actualizarPageLinks(): void {
    this.pageLinks.set(window.innerWidth <= 320 ? 3 : 5);
  }

  callPage(): void {
    this.service.getAlumnos().subscribe({
      next: (res) => {
        console.log('Alumnos recibidos:', res);
        this.alumnos.set(res);
      },
      error: (err) => {
        console.error('Error al traer alumnos:', err);
      },
    });
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }

  abrirFormulario(): void {
    this.mostrarFormulario.set(true);
  }

  abrirFormularioNota(id: number): void {
    this.alumnoNotaId.set(id);
    this.mostrarFormularioNota.set(true);
  }

  cerrarFormulario(): void {
    this.mostrarFormulario.set(false);
    this.mostrarFormularioNota.set(false);
    this.alumnoNotaId.set(null);
  }

  verAlumno(id: number): void {
    this.service.getAlumnoByID(id).subscribe({
      next: (res: Alumno) => {
        console.log('Ver alumno desde la base de datos:', res);
        this.alumnoSeleccionado.set(res);
        this.mostrarModalDetalles.set(true);
      },
      error: (err) => {
        console.error('Error al traer los detalles del alumno:', err);
      },
    });
  }

  eliminarBajaLogica(id: number): void {
    this.service.deleteAlumnoLogico(id).subscribe({
      next: (res: Alumno) => {
        console.log('Estado del alumno actualizado con exito: ', res);
        this.callPage();
      },
      error: (err) => {
        console.error('Error al intentar cambiar el estado del alumno:', err);
      },
    });
  }
}