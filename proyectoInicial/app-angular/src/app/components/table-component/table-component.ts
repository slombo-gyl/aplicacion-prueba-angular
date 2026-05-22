import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alumnos-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './table-component.html',
  styleUrl: './table-component.css',
})
export class AlumnosTableComponent {
  @Input({ required: true }) set data(value: any[]) {
    this.alumnos.set(value);
    this.paginaActual.set(1);
  }

  alumnos = signal<any[]>([]);

  itemsPorPagina = 5;
  paginaActual = signal(1);

  alumnosPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.alumnos().slice(inicio, fin);
  });

  totalPaginas = computed(() => {
    return Math.ceil(this.alumnos().length / this.itemsPorPagina) || 1;
  });

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas()) {
      this.paginaActual.set(nuevaPagina);
    }
  }
}
