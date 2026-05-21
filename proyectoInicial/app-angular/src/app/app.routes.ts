import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { Formulario } from './components/formulario/formulario';
import { Dashboard } from './views/dashboard/dashboard';
import { Alumno } from './views/alumnos/alumno';
import { Materias } from './views/materias/materias';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'formulario', component: Formulario },
  { path: 'dashboard', component: Dashboard },
  { path: 'alumnos', component: Alumno },
  { path: 'materias', component: Materias }
];