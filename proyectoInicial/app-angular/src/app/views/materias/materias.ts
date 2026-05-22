import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { FormularioAgregarMateria } from '../../components/formulario-agregar-materia/formulario-agregar-materia';
import { DetalleMateria } from '../../components/detalle-materia/detalle-materia';
import { MateriasService } from '../../services/materias.service';
import { MateriaResponse } from '../../interfaces/response/materia.response';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [TableModule, FormularioAgregarMateria, DetalleMateria],
  templateUrl: './materias.html',
  styleUrl: './materias.css',
})
export class Materias implements OnInit {
  private router = inject(Router);
  private materiasService = inject(MateriasService);

  materias = this.materiasService.materias;
  materiaSeleccionada = signal<MateriaResponse | null>(null);

  mostrarFormulario = signal<boolean>(false);
  mostrarDetalleMateria = signal<boolean>(false);

  ngOnInit() {
    this.materiasService.getMaterias().subscribe({
      next: (data: MateriaResponse[]) => console.log('Materias cargadas correctamente', data.length),
      error: (error: any) => console.error('Error al cargar materias: ', error)
    });
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  abrirFormulario() {
    this.mostrarFormulario.set(true);
  }

  cerrarFormulario() {
    this.mostrarFormulario.set(false);
  }

  verDetalleMateria(materia: MateriaResponse) {
    this.materiaSeleccionada.set(materia);
    this.mostrarDetalleMateria.set(true);
  }

  cerrarDetalleMateria() {
    this.mostrarDetalleMateria.set(false);
    this.materiaSeleccionada.set(null);
  }

  eliminarMateria(id: number) {
    this.materiasService.deleteMateria(id).subscribe({
      next: () => console.log(`Materia con ID ${id} eliminada correctamente`),
      error: (error: any) => console.error(`Error al eliminar materia con ID ${id}: `, error)
    });
  }
}
