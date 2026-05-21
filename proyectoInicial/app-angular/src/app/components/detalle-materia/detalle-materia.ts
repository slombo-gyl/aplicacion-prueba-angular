import { Component, input, output, signal } from '@angular/core';
import { MateriaModel } from '../../interfaces/models/materia.model';
import { EditarMateria } from '../editar-materia/editar-materia';

@Component({
  selector: 'app-detalle-materia',
  standalone: true,
  imports: [EditarMateria],
  templateUrl: './detalle-materia.html',
  styleUrl: './detalle-materia.css',
})
export class DetalleMateria {
  materia = input.required<MateriaModel>();
  cerrar = output<void>();

  mostrarEditar = signal(false);

  onCerrar() {
    this.cerrar.emit();
  }

  abrirEditar() {
    this.mostrarEditar.set(true);
  }

  cerrarEditar() {
    this.mostrarEditar.set(false);
  }
}
