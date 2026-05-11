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

  /*instanciamos el router */
  constructor(private router: Router) {}

  /*instanciamos al padre paraa poder acceder a sus métodos*/
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




  /* creamos el método para  llamar la funcion del modal padre */
abrirModal(){
  this.modal.abrir()
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
