import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component,OnInit, ViewChild, ElementRef, NgZone , AfterViewInit} from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-servicelevel',
  templateUrl: './servicelevel.page.html',
  styleUrls: ['./servicelevel.page.scss'],
})
export class ServicelevelPage implements OnInit {

  @ViewChild('pieChartCanvas1', { static: false }) pieChartCanvas1?: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas2', { static: false }) pieChartCanvas2?: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas3', { static: false }) pieChartCanvas3?: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas4', { static: false }) pieChartCanvas4?: ElementRef<HTMLCanvasElement>;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.createChart(this.pieChartCanvas1, [10, 90], [ '#f6fcfd','#d31d25']);
    this.createChart(this.pieChartCanvas2, [25, 75], [ '#f6fcfd','#d31d25']);
    this.createChart(this.pieChartCanvas3, [15, 85], [ '#f6fcfd','#d31d25']);
    this.createChart(this.pieChartCanvas4, [40, 60], [ '#f6fcfd','#d31d25']);
  }
  private createChart(canvas: ElementRef<HTMLCanvasElement> | undefined, data: number[], colors: string[]) {
    if (canvas) {
      const chartCtx = canvas.nativeElement.getContext('2d');
  
      if (chartCtx) {
        const chartData = {
          datasets: [{
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
          }],
          // labels: ['KPI1', 'KPI2'],
        };
  
        const options = {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            datalabels: {
              formatter: (value: number, context: any) => {
                const total = context.chart.data.datasets[0].data.reduce((acc: number, curr: number) => acc + curr, 0);
                const percentage = ((value / total) * 100).toFixed(1) + '%';
                return percentage;
              },
              anchor: 'center',
              color: 'white',
              font: {
                weight: 'bold', // Set the font weight to 'bold'
                size: 20, // Adjust the font size to your preferred value
              },
            },
          },
        };
  
        Chart.register(ChartDataLabels);
  
        new Chart(chartCtx, {
          type: 'doughnut',
          data: chartData,
          // options: options,
        });
      }
    }
  }
  
//footer start
async Home(){
  this.router.navigate(['/dashboard']);
}

async Agents(){
  this.router.navigate(['/agentlist']);

}

async ServiceLevel(){
  this.router.navigate(['/servicelevel']);
}

async DailyStats(){
  this.router.navigate(['/dailystats']);

}

//footer end
  ngOnInit() {
  }

}
