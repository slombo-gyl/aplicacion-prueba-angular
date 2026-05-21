import { Component, computed, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { FormularioAgregarMateria } from '../../components/formulario-agregar-materia/formulario-agregar-materia';
import { DetalleMateria } from '../../components/detalle-materia/detalle-materia';
import { MateriasService } from '../../services/materias.service';
import { MateriaModel } from '../../interfaces/models/materia.model';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [TableModule, FormularioAgregarMateria, DetalleMateria],
  templateUrl: './materias.html',
  styleUrl: './materias.css',
})
export class Materias {
  private router = inject(Router);
  materiasService = inject(MateriasService);

  materias = computed(() => this.materiasService.materias());

  materiaSeleccionada = signal<MateriaModel | null>(null);
  materiaDetalle = computed(() => {
    const sel = this.materiaSeleccionada();
    if (!sel) return null;
    return this.materiasService.materias().find(m => m.id === sel.id) || null;
  });

  mostrarFormulario = signal(false);
  mostrarDetalleMateria = signal(false);

  navigateToHome() {
    this.router.navigate(['']);
  }

  abrirFormulario() {
    this.mostrarFormulario.set(true);
  }

  cerrarFormulario() {
    this.mostrarFormulario.set(false);
  }

  verDetalleMateria(materia: MateriaModel) {
    this.materiaSeleccionada.set(materia);
    this.mostrarDetalleMateria.set(true);
  }

  cerrarDetalleMateria() {
    this.mostrarDetalleMateria.set(false);
    this.materiaSeleccionada.set(null);
  }
}
