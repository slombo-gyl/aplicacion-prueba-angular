import { Component } from '@angular/core';
import { ChartRadar} from './components/chart/chart';
import { ChartModule } from "primeng/chart";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [ChartRadar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
 constructor(private router: Router) {}

 
  navigateToHome(){
    this.router.navigate([''])
  }

}
