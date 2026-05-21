import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',loadComponent: () =>import('./views/home/home').then(m => m.Home) },
  { path: 'formulario', loadComponent: () => import('./components/formulario/formulario').then(m => m.Formulario)},
  { path: 'dashboard', loadComponent: () => import('./views/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'alumnos', loadComponent: () => import('./views/tablaAlumnos/table').then(m => m.TableComponent) },
  { path: 'notas', loadComponent: () => import('./views/notas-alumno/notas-alumno').then(m => m.NotasAlumno) }
];     