import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from "@angular/router";
import { Formulario } from '../../components/formulario/formulario';
import { FormularioNota } from '../../components/formulario-notas/formulario-notas';
import { Alumno } from '../../../interfaces/alumno.interfaces';




@Component({
  selector: 'app-table',
  standalone: true,
  // Agregar los imports de este componente
  imports: [TableModule, Formulario,FormularioNota ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class TableComponent {
  //servicio = inject(servicio);
  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigate([''])
  }

  // Estado del modal (equivalente a useState en React)
  mostrarFormulario = signal(false);
  mostrarFormularioNota = signal(false);

  abrirFormulario() {
    this.mostrarFormulario.set(true);
  }

  abrirFormularioNota() {
    this.mostrarFormularioNota = signal(true);

  }

  cerrarFormulario() {
    this.mostrarFormulario.set(false);
    this.mostrarFormularioNota.set(false);
  }

alumnos: any[] = [
  { nombre: 'Juan Pérez', dni: '12345678', email: 'juan@example.com', notas: 8 },
  { nombre: 'María García', dni: '87654321', email: 'maria@example.com', notas: 9 },
  { nombre: 'Carlos López', dni: '11223344', email: 'carlos@example.com', notas: 6 },
  { nombre: 'Ana Martínez', dni: '44332211', email: 'ana@example.com', notas: 10 }
];
verAlumno(alumno: any) { // <--- Cambia Alumno por any temporalmente para prueba
  console.log("Ver alumno:", alumno);
}
  cambiarEstado(){
    console.log("Borrado logico")
    //pathid
  }
}