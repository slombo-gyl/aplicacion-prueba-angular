import { Component, signal } from '@angular/core';
import { Menu } from '../../components/menu/menu';


@Component({
  selector: 'app-home',
  imports: [Menu],
  templateUrl:'./home.html',
  styleUrl: './home.css',
})
export default class Home {


  mensaje = signal(''); 
  logged = signal(false);

  titulo = 'ANGULAR APLICACIÖN';

  usuario = {
    nombre: 'Juan Sebastian',
    edad: 35,
  };

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
