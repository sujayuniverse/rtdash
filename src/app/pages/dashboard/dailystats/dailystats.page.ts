import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as GaugeChart from 'gauge-chart';

@Component({
  selector: 'app-dailystats',
  templateUrl: './dailystats.page.html',
  styleUrls: ['./dailystats.page.scss'],
})
export class DailystatsPage implements OnInit {

  constructor(private router: Router) { }

  ionViewDidEnter() {
    this.GaugeChartFor_AvgCallInteraction();
    this.ThresholdGaugeChart();
    this.ACDTimeGaugeChart()
  }
 
  GaugeChartFor_AvgCallInteraction() {
    const element = document.querySelector('#gaugeArea') as HTMLElement;
    const timeTextElement = document.querySelector('#timeText') as HTMLElement;
  
    if (element && timeTextElement) {
      const gaugeOptions = {
        hasNeedle: true,
        needleColor: 'rgba(212,30,38,1)',
        needleUpdateSpeed: 1000,
        arcColors: ['rgba(212,30,38,1)', 'lightgray'],
        arcDelimiters: [70], // represents 70% of the gauge (adjust this for your specific needs)
        rangeLabel: ['00:00', '10:00'], // corresponds to 00:00 to 10:00
        // centralLabel: '5:00', // middle label if needed
      };
  
      const gaugeChart = GaugeChart.gaugeChart(element, 300, gaugeOptions);
  
      let currentValue = 7; // Set the initial value in minutes (e.g., 7 minutes)
      const percentage = (currentValue / 10) * 100; // convert minutes to a percentage of the maximum (10 minutes)
      gaugeChart.updateNeedle(percentage); // Set the needle position based on percentage
  
      // Format the time to display in HH:mm format
      const formattedTime = `${currentValue.toString().padStart(2, '0')}:00`;
      timeTextElement.textContent = `Avg. ACD time - ${formattedTime}`;
    } else {
      console.error('Element with id "gaugeArea" or "timeText" not found');
    }
  }
  



  ThresholdGaugeChart() {
    const element3 = document.querySelector('#thresholdGaugeArea') as HTMLElement;
    const percentageTextElement3 = document.querySelector('#thresholdPercentageText') as HTMLElement;

    if (element3 && percentageTextElement3) {
      const gaugeOptions3 = {
        hasNeedle: true,
        needleColor: 'green',
        needleUpdateSpeed: 1500,
        arcColors: ['green', 'lightgray'],
        arcDelimiters: [85],
        rangeLabel: ['0%', '100%'],
      };

      const gaugeChart3 = GaugeChart.gaugeChart(element3, 300, gaugeOptions3);

      let currentValue3 = 85; // Set the initial value to the boundary value
      gaugeChart3.updateNeedle(currentValue3); // Set the needle position initially

      // Update the text below the gauge chart to reflect the value
      percentageTextElement3.textContent = `Service Level - ${currentValue3.toFixed(2)}%`;
    } else {
      console.error('Element with id "thresholdGaugeArea" or "thresholdPercentageText" not found');
    }
  }

  

  ACDTimeGaugeChart() {
    const element4 = document.querySelector('#ACDTimeGaugeArea') as HTMLElement;
    const percentageTextElement4 = document.querySelector('#ACDTimePercentageText') as HTMLElement;

    if (element4 && percentageTextElement4) {
      const gaugeOptions4 = {
        hasNeedle: true,
        needleColor: 'green',
        needleUpdateSpeed: 1500,
        arcColors: ['green', 'lightgray'],
        arcDelimiters: [95],
        rangeLabel: ['0%', '100%'],
      };

      const gaugeChart4 = GaugeChart.gaugeChart(element4, 300, gaugeOptions4);

      let currentValue4 = 95; // Set the initial value to the boundary value
      gaugeChart4.updateNeedle(currentValue4); // Set the needle position initially

      // Update the text below the gauge chart to reflect the value
      percentageTextElement4.textContent = `ACD Time - ${currentValue4.toFixed(2)}%`;
    } else {
      console.error('Element with id "ACDTimeGaugeArea" or "ACDTimePercentageText" not found');
    }
  }


  // ThreasholdSLGaugeChart() {
  //   const element2 = document.querySelector('#anotherGaugeArea') as HTMLElement;
  //   const percentageTextElement2 = document.querySelector('#anotherPercentageText') as HTMLElement;

  //   if (element2 && percentageTextElement2) {
  //     const gaugeOptions2 = {
  //       hasNeedle: true,
  //       needleColor: 'rgba(212,30,38,1)',
  //       needleUpdateSpeed: 1500,
  //       arcColors: ['rgba(212,30,38,1)', 'lightgray'],
  //       arcDelimiters: [40],
  //       rangeLabel: ['0', '100'],
  //     };

  //     const gaugeChart2 = GaugeChart.gaugeChart(element2, 300, gaugeOptions2);

  //     let currentValue2 = 40; // Set the initial value to the boundary value
  //     gaugeChart2.updateNeedle(currentValue2); // Set the needle position initially

  //     // Update the text below the gauge chart to reflect the value
  //     percentageTextElement2.textContent = `Threshold SL - ${currentValue2.toFixed(2)}%`;
  //   } else {
  //     console.error('Threshold Service Level " or "Threshold Service Level " not found');
  //   }
  // }



  async Home() {
    this.router.navigate(['/dashboard']);
  }

  async Agents() {
    this.router.navigate(['/agentlist']);
  }

  async ServiceLevel() {
    this.router.navigate(['/servicelevel']);
  }

  async DailyStats() {
    this.router.navigate(['/dailystats']);
  }

  ngOnInit() {
  }
}
