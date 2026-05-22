import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AlumnoService, Alumno } from './service/alumnoServis';
import { AlumnosTableComponent } from '../../components/table-component/table-component';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink, AlumnosTableComponent],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class TableComponent implements OnInit {
  private alumnoService = inject(AlumnoService);

  constructor(private router: Router) {}

  alumnos = signal<Alumno[]>([]);

  mostrarFormulario = signal(false);

  modo = signal<'registrar' | 'editar'>('registrar');
  alumnoSeleccionado = signal<any>(null);

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe({
      next: (data: any) => {
        this.alumnos.set(data.content);
      },
      error: (err) => console.error('Error al cargar alumnos', err),
    });
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  abrirRegistrar() {
    this.modo.set('registrar');
    this.alumnoSeleccionado.set(null);
    this.mostrarFormulario.set(true);
  }

  abrirEditar(alumno: any) {
    this.modo.set('editar');
    this.alumnoSeleccionado.set(alumno);
    this.mostrarFormulario.set(true);
  }

  cerrarFormulario() {
    this.mostrarFormulario.set(false);
  }

  guardarAlumno(alumno: Alumno) {
    if (this.modo() === 'registrar') {
      this.crearAlumno(alumno);
    } else {
      this.modificarAlumno(alumno);
    }
  }

  crearAlumno(alumno: Alumno) {
    this.alumnoService.crearAlumno(alumno).subscribe({
      next: (alumnoCreado) => {
        const listaActual = this.alumnos();
        this.alumnos.set([...listaActual, alumnoCreado]);
        this.cerrarFormulario();
      },
      error: (err) => {
        console.error('Error al crear alumno', err);
        alert('Error al cargar un alumno. Por favor, intente nuevamente.');
      },
    });
  }

  modificarAlumno(alumno: Alumno) {
    const alumnoActual = this.alumnoSeleccionado();

    this.alumnoService.actualizarAlumno(alumnoActual.id, alumno).subscribe({
      next: (alumnoActualizado) => {
        const listaNueva = this.alumnos().map((item) => {
          if (item.id === alumnoActual.id) {
            return alumnoActualizado;
          }

          return item;
        });

        this.alumnos.set(listaNueva);
        this.cerrarFormulario();
      },
      error: (err) => {
        console.error('Error al modificar alumno', err);
        alert('Error al actualizar un alumno. Por favor, intente nuevamente.');
      },
    });
  }

  verDetalles(alumno: Alumno) {
    this.router.navigate(['/detalleAlumno'], { state: { alumno: alumno } });
  }
  
}
