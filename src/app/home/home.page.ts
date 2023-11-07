// import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import * as c3 from 'c3';
// import * as d3 from 'd3';
import { Component,OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('pieChartCanvas1', { static: false }) pieChartCanvas1?: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas2', { static: false }) pieChartCanvas2?: ElementRef<HTMLCanvasElement>;
  selectedOption : any 
  constructor(private router: Router, private route: ActivatedRoute, private ngZone: NgZone) {}




  ngAfterViewInit() {
    this.createChart(this.pieChartCanvas1, [10, 90], ['white', '#e16167'], '90/100');
    this.createChart(this.pieChartCanvas2, [25, 75], ['white', '#e16167'], '25/100');
  }
  
  private createChart(canvas: ElementRef<HTMLCanvasElement> | undefined, data: number[], colors: string[], text: string) {
    if (canvas) {
      const chartCtx = canvas.nativeElement.getContext('2d');
  
      if (chartCtx) {
        const chartData = {
          datasets: [{
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors
          }]
        };
  
        const options = {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        };
  
        new Chart(chartCtx, {
          type: 'doughnut',
          data: chartData,
          options: options
        });
  
        // Draw the text in the middle of the doughnut chart
        chartCtx.font = '16px Arial';
        chartCtx.fillStyle = '#000';
        chartCtx.textAlign = 'center';
        chartCtx.fillText(text, canvas.nativeElement.width / 2, canvas.nativeElement.height / 2);
      }
    }
  }
}
