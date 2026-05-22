import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MateriasService, MateriaDetalle } from '../../services/materias.service';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materias.html',
  styleUrl: './materias.css',
})
export class MateriasComponent implements OnInit {
  private router = inject(Router);
  private materiasService = inject(MateriasService);

  materias = signal<MateriaDetalle[]>([]);
  mostrarModal = signal(false);
  nuevaMateriaNombre = signal('');

  materiaExpandida = signal<number | null>(null);

  ngOnInit() {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.materiasService.getMateriasDetalle().subscribe({
      next: (data) => this.materias.set(data),
      error: (err) => console.error('Error al cargar materias', err),
    });
  }

  volver() {
    this.router.navigate(['']);
  }

  abrirModal() {
    this.nuevaMateriaNombre.set('');
    this.mostrarModal.set(true);
  }

  cerrarModal() {
    this.mostrarModal.set(false);
  }

  guardarMateria() {
    if (!this.nuevaMateriaNombre().trim()) return;

    this.materiasService.crearMateria({ nombre: this.nuevaMateriaNombre() }).subscribe({
      next: () => {
        alert('Materia creada con éxito');
        this.cargarMaterias();
        this.cerrarModal();
      },
      error: (err) => alert('Error al crear la materia'),
    });
  }

  eliminarMateria(id: number) {
    if (
      confirm(
        '¿Estás seguro de que deseas dar de baja esta materia? Se eliminarán las notas asociadas.',
      )
    ) {
      this.materiasService.eliminarMateria(id).subscribe({
        next: () => {
          alert('Materia dada de baja');
          this.cargarMaterias();
        },
        error: (err) => alert('Error al eliminar la materia'),
      });
    }
  }

  toggleAlumnos(id: number) {
    this.materiaExpandida.update((current) => (current === id ? null : id));
  }
}
