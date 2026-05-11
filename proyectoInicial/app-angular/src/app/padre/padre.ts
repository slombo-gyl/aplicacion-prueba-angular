import { Component, EventEmitter, signal, ViewChild, ElementRef } from '@angular/core';
import { Hijo } from './hijo/hijo';

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {
  
  /* Utilizamos el ViewChild para poder accerder a sus métodos */
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;

  /* aca se guada la data del hijo */
  seleccionados = signal<string[]>([]);

  abrir() {
    this.modalRef.nativeElement.showModal();
  }

  cerrar() {
    this.modalRef.nativeElement.close();
  }

  /* creamos el evento  */
  onCheckboxChangee(event: { value: string; checked: boolean }) {
    this.seleccionados.update((lista) =>
      event.checked ? [...lista, event.value] : lista.filter((v) => v != event.value),
    );
  }
}
