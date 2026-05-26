import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'bar-menu',
  imports: [RouterLink, ButtonModule],
  templateUrl: './menu.html',
})
export class Menu {
  private router = inject(Router);

  navigateTo(){
    this.router.navigate(['/dashboard']);
  }
}
