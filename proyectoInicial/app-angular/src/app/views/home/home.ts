import { Component, ViewChild } from '@angular/core';
import { Padre } from '../../padre/padre';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Padre, RouterLink, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  @ViewChild('modalPadre') modal!: Padre;

  abrirModal() {
    this.modal.abrir();
  }
}
