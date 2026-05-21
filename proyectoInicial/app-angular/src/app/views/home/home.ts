import { Component, ViewChild } from '@angular/core';
import { Padre } from '../../padre/padre';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Padre, RouterLink, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}

  @ViewChild('modalPadre') modal!: Padre;

  navigateTo() {
    this.router.navigate(['/dashboard']);
  }

  abrirModal() {
    this.modal.abrir();
  }
}
