import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { 
        path: '',
        loadComponent: () => import('./views/home/home')
       },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./views/dashboard/dashboard') 
      },
      { 
        path: 'alumnos', 
        loadComponent: () => import('./views/alumnos/alumno') 
      },
      { 
        path: 'materias', 
        loadComponent: () => import('./views/materias/materias')   
      },
      { 
        path: '**', redirectTo: '' }
    ] 
  }
];