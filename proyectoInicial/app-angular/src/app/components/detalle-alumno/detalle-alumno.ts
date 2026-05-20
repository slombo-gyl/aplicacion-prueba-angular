import { Component, input, output, signal } from '@angular/core';
import { AlumnoModel } from '../../interfaces/models/alumno.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-detalle-alumno',
  imports: [TableModule],
  templateUrl: './detalle-alumno.html',
  styleUrl: './detalle-alumno.css',
})
export class DetalleAlumno {
  alumno = input.required<AlumnoModel>();
  cerrar = output<void>();

  materiasMock = signal([
    { nombre: 'Diseño', calificacion: 5 }
  ]);

  onCerrar() {
    this.cerrar.emit();
  }
}
