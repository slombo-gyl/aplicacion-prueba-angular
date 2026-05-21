import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-componente',
  standalone: true,
  imports: [],
  templateUrl: './error-componente.html',
  styleUrl: './error-componente.css',
})
export class ErrorComponente {

  constructor(private router: Router) {}

  volverInicio() {
    this.router.navigate(['']);
  }

  volverAlumnos() {
    this.router.navigate(['/alumnos']);
  }
}
