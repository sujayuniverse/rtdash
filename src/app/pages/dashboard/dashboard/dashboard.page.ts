import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component,OnInit, ViewChild, ElementRef, NgZone , AfterViewInit} from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild('pieChartCanvas5', { static: false }) pieChartCanvas5?: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas6', { static: false }) pieChartCanvas6?: ElementRef<HTMLCanvasElement>;
 
  selectedOption : any 
  constructor(private router: Router, private route: ActivatedRoute, private ngZone: NgZone) {}



  ngAfterViewInit() {
    this.createChart(this.pieChartCanvas5, [10, 90], [ '#f6fcfd','#d31d25']);
    this.createChart(this.pieChartCanvas6, [10, 90], [ '#f6fcfd','#d31d25']);
    // this.createChart(this.pieChartCanvas3, [15, 85], [ '#8a8c8f','#d31d25']);
    // this.createChart(this.pieChartCanvas4, [40, 60], [ '#8a8c8f','#d31d25']);
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
              font: {
                weight: 'bold', // Set the font weight to 'bold'
                size: 20, // Adjust the font size to your preferred value
                color: '#FFFFFF',

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
