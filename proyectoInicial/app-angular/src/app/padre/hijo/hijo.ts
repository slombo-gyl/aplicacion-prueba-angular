import { Component, EventEmitter, input, output, Output, signal } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})

export class Hijo {
 
  label = input<string>();
  value =  input<string>();

  checked = signal(false);

  checkedChange = output<{value:string, checked : boolean}>();

  toggle(event:Event) {
    const input = event.target as HTMLInputElement;
    
    this.checked.set(input.checked)

    this.checkedChange.emit({
      value:this.value()!,
      checked: input.checked
    })
  }
}