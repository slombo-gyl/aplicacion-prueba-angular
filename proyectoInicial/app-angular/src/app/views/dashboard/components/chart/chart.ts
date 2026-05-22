import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { PuntajesService } from '../../../../services/puntajes.service';

@Component({
  selector: 'app-chart-radar',
  templateUrl: './chart.html',
  styleUrl: './chart.css',
  standalone: true,
  imports: [ChartModule],
})
export class ChartRadar implements OnInit {
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  constructor(
    private puntajesService: PuntajesService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      this.puntajesService.getChart().subscribe((res) => {
        const agrupado: { [key: string]: { suma: number; cantidad: number } } = {};

        for (let i = 0; i <= res.labels.length; i++) {
          const materia = res.labels[i];
          const nota = res.data[i];

          if (!materia || materia === 'undefined') {
            continue;
          }

          if (!agrupado[materia]) {
            agrupado[materia] = { suma: 0, cantidad: 0 };
          }

          agrupado[materia].suma += nota;
          agrupado[materia].cantidad += 1;
        }

        const etiquetasUnicas = Object.keys(agrupado);
        const promedios = etiquetasUnicas.map(materia => {
          const promedio = agrupado[materia].suma / agrupado[materia].cantidad;
          return Math.round(promedio * 100) / 100;
        });

        this.data = {
          labels: etiquetasUnicas,
          datasets: [
            {
              borderColor: '#E0BF66',
              backgroundColor: 'rgba(224, 191, 102, 0.25)',
              pointBackgroundColor: '#E0BF66',
              pointBorderColor: '#090909',
              pointHoverBackgroundColor: '#F6F1E7',
              pointHoverBorderColor: '#E0BF66',
              data: promedios,
            },
          ],
        };

        this.cd.detectChanges();
      });
      this.options = {
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          r: {
            min: 0,
            max: 10,
            grid: {
              color: 'rgba(90, 74, 42, 0.4)',
            },
            angleLines: {
              color: 'rgba(90, 74, 42, 0.4)',
            },
            pointLabels: {
              color: '#E0BF66',
              font: { size: 13, weight: 'bold' }
            },
            ticks: {
              color: '#F6F1E7',
              backdropColor: 'transparent'
            }
          },
        },
      };

    }
  }
}
