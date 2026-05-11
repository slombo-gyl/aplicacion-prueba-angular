import { Component, EventEmitter, input, output, Output, signal } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo {

  /* son los datos que vamos a recibir  */
 
  label = input<string>();
  value =  input<string>();

  /* manejamos el estado del checkbox */
  checked = signal(false);

  /**creamos el evento para enviarlo al padre */
 checkedChange = output<{value:string, checked : boolean}>();

  toggle(event:Event){
  const input = event.target as HTMLInputElement;
  
  /* cambiamos el estado  */
  this.checked.set(input.checked)


/* se envia el resultado */
  this.checkedChange.emit({
    value:this.value()!,
    checked: input.checked
  })

  }


 }
