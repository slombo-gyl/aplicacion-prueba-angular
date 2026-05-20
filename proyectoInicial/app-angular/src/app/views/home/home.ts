import { Component, signal, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  /*instanciamos el router */
  constructor(private router: Router) {}


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




  saludar() {
    return `Bienvenido`;
  }

  /* manejamos el estado  */
  toggleLoggin() {
    this.logged.set(!this.logged());
    if (this.logged()) {
      this.mensaje.set(this.saludar());
    } else {
      this.mensaje.set('');
    }
  }
}
