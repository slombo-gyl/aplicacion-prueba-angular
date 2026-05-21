import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { Formulario } from './components/formulario/formulario';
import { Dashboard } from './views/dashboard/dashboard';
import { TableComponent } from './views/tablaAlumnos/table';
import { NotasAlumno } from './views/notas-alumno/notas-alumno';
import { DetalleAlumno } from './views/detalle-alumno/detalle-alumno';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'formulario', component: Formulario },
  { path: 'dashboard', component: Dashboard },
  { path: 'alumnos', component: TableComponent },
  { path: 'notas', component: NotasAlumno },
  { path: 'detalleAlumno', component: DetalleAlumno}
];     