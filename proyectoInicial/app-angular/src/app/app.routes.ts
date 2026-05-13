import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { Formulario } from './components/formulario/formulario';
import { Dashboard } from './views/dashboard/dashboard';
import { TableComponent } from './views/tablaAlumnos/table';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'formulario', component: Formulario },
  { path: 'dashboard', component: Dashboard },
  { path: 'alumnos', component: TableComponent },
];     