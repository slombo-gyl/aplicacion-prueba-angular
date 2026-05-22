import { Component, signal, ViewChild } from '@angular/core';
import { Padre } from '../../padre/padre';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Padre, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  constructor(private router: Router) {}

  @ViewChild("modalPadre") modal!: Padre

  mensaje = signal(''); 
  logged = signal(false);

  titulo = 'ANGULAR APLICACIÖN';

  usuario = {
    nombre: 'Juan Sebastian',
    edad: 35,
  };

  navigateTo(){
    this.router.navigate(['/dashboard'])
  }

  abrirModal(){
    this.modal.abrir()
  }

  saludar() {
    return `Bienvenido`;
  }

  toggleLoggin() {
    this.logged.set(!this.logged());
    
    if (this.logged()) {
      this.mensaje.set(this.saludar());
    } else {
      this.mensaje.set('');
    }
  }
}