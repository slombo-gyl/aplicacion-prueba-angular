import { Component, signal, ViewChild } from '@angular/core';
import { Padre } from './padre/padre';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

}
