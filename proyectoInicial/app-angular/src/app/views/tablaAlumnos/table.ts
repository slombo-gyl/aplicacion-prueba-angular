import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from "@angular/router";
import { Formulario } from '../../components/formulario/formulario';
import { FormularioNota } from '../../components/formulario-notas/formulario-notas';
import { Alumno } from '../../../interfaces/alumno.interface';
import { AlumnoService } from './service/alumnoService';

@Component({
  selector: 'app-table',
  standalone: true,
  // Agregar los imports de este componente
  imports: [TableModule, Formulario,FormularioNota ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class TableComponent {
  
  private service = inject(AlumnoService);
  alumnos = signal<Alumno[]>([]);

  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigate([''])
  }

  ngOnInit(): void {
    this.callPage();
  }

  callPage() {
    this.service.getAlumnos().subscribe((res) => {
      this.alumnos.set(res);
    });
  }

  // Estado del modal (equivalente a useState en React)
  mostrarFormulario = signal(false);
  mostrarFormularioNota = signal(false);

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
  this.service.getAlumnoByID(id).subscribe((res) => {console.log("Ver alumno:", res)});
}
  cambiarEstado(id:number){
    this.service.deleteAlumnoLogico(id).subscribe((res) => {console.log("Alumno eliminado: ", res)})
  }
}