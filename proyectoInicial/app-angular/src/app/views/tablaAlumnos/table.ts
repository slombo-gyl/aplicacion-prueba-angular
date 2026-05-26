import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from "@angular/router";
import { Formulario } from '../../components/formulario/formulario';
import { FormularioNota } from '../../components/formulario-notas/formulario-notas';
import { Alumno } from '../../../interfaces/alumno.interface';
import { AlumnoService } from './service/alumnoService';
import { Dialog } from 'primeng/dialog'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, Formulario, FormularioNota, Dialog, CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class TableComponent implements OnInit {
  
  private service = inject(AlumnoService);
  private router = inject(Router); // Usando inject para mantener consistencia

  alumnos = signal<Alumno[]>([]);
  mostrarFormulario = signal(false);
  mostrarFormularioNota = signal(false);

  // CONTROL DE DETALLES
  mostrarModalDetalles = signal(false);
  alumnoSeleccionado = signal<Alumno | null>(null);

  // --- NUEVO SIGNAL: Para controlar qué lista está activa ---
  filtroActivo = signal<'activos' | 'inactivos'>('activos');

  ngOnInit(): void {
    this.cargarDatos(); // Cambié el nombre para que sea más descriptivo
  }

  // --- MODIFICADO: Centraliza la carga según el filtro activo ---
  cargarDatos(): void {
    if (this.filtroActivo() === 'activos') {
      this.service.getAlumnos().subscribe({
        next: (res) => this.alumnos.set(res),
        error: (err) => console.error('Error al traer alumnos activos:', err)
      });
    } else {
      this.service.getAlumnosInactivos().subscribe({
        next: (res) => this.alumnos.set(res),
        error: (err) => console.error('Error al traer alumnos inactivos:', err)
      });
    }
  }

  // --- NUEVO MÉTODO: Se ejecuta al presionar los botones en el HTML ---
  cambiarFiltro(tipo: 'activos' | 'inactivos'): void {
    this.filtroActivo.set(tipo);
    this.cargarDatos(); // Recarga la lista con el nuevo filtro
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  abrirFormulario() {
    this.mostrarFormulario.set(true);
  }

  abrirFormularioNota() {
    this.mostrarFormularioNota.set(true);
  }

  cerrarFormulario() {
    this.mostrarFormulario.set(false);
    this.mostrarFormularioNota.set(false);
  }

  verAlumno(id: number) {
    this.service.getAlumnoByID(id).subscribe({
      next: (res: Alumno) => {
        console.log("Ver alumno desde la base de datos:", res);
        this.alumnoSeleccionado.set(res);
        this.mostrarModalDetalles.set(true);
      },
      error: (err) => console.error("Error al traer los detalles:", err)
    });
  }

eliminarBajaLogica(id: number) {
    this.service.deleteAlumnoLogico(id).subscribe({
      next: (res: any) => {
        console.log("Estado del alumno actualizado con éxito: ", res);
        this.cargarDatos(); // Mantiene el filtro actual tras la actualización
      },
      error: (err) => console.error("Error al intentar cambiar el estado:", err)
    });
  }
}