import * as GaugeChart from 'gauge-chart';



import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { RestApiService } from 'src/app/rest-api.service'
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { SetbaseurlService } from 'src/app/setbaseurl.service';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dailystats',
  templateUrl: './dailystats.page.html',
  styleUrls: ['./dailystats.page.scss'],
})
export class DailystatsPage implements OnInit {
  Site_url: string = "";
  DailyStatData: any = ""
  AsaTime : number =0;
  thresholdServiceLevelPercentage: number = 0
  PercentageOfACDtime : number = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private http: HttpClient,
    private baseurl: SetbaseurlService,
    public restApiService: RestApiService,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform,
    private activatedRoute: ActivatedRoute) {
    this.Site_url = this.baseurl.Set_base_url
    this.GetData()
  }

  async GetData() {
    const fetchData = async () => {
      // const loading = await this.loadingController.create({
      //   message: 'Please wait',
      //   duration: 20000
      // });
      // await loading.present();
  
      this.http.get<any>(this.Site_url + 'Get_DailyStats').subscribe(
        (data) => {
          this.DailyStatData = data; // Assuming data is in JSON format
  
          // Accessing attributes
          if (this.DailyStatData) {
            this.AsaTime = this.DailyStatData.AvgCallInteraction;
            this.PercentageOfACDtime = this.DailyStatData.PercentageOfACDtime;
            this.thresholdServiceLevelPercentage = this.DailyStatData.ThresholdServiceLevelPercentage;
  
            console.log('AvgCallInteraction: ', this.AsaTime);
            console.log('PercentageOfACDtime: ', this.PercentageOfACDtime);
            console.log('ThresholdServiceLevelPercentage: ', this.thresholdServiceLevelPercentage);
          }
          this.GaugeChartFor_AvgCallInteraction();
          this.ThresholdGaugeChart();
          this.ACDTimeGaugeChart()
        },
        (error) => {
          console.error('Error fetching daily stats:', error);
        },
        () => {
          // loading.dismiss(); // Dismiss loading indicator once data is loaded
        }
      );
    };
  
    // Call initially and then every 15 seconds
    fetchData();
    setInterval(fetchData, 15000); // 15 seconds interval in milliseconds
  }
  



  // async GetData() {
  //   const fetchData = async () => {
  //     const loading = await this.loadingController.create({
  //       message: 'Please wait',
  //       duration: 20000
  //     });
  //     await loading.present();

  //     this.http.get(this.Site_url + 'Get_DailyStats').subscribe(data => {
  //       this.DailyStatData = data;
  //       console.log('DailyStatData ', this.DailyStatData);
  //     });


  //     loading.dismiss();
  //   };

  //   // Call initially and then every 15 seconds
  //   fetchData();
  //   setInterval(fetchData, 15000); // 15 seconds interval in milliseconds
  // }



  // ionViewDidEnter() {
  //   this.GaugeChartFor_AvgCallInteraction();
  //   this.ThresholdGaugeChart();
  //   this.ACDTimeGaugeChart()
  // }

  GaugeChartFor_AvgCallInteraction() {
    const element = document.querySelector('#gaugeArea') as HTMLElement;
    const timeTextElement = document.querySelector('#timeText') as HTMLElement;

    if (element && timeTextElement) {
      const gaugeOptions = {
        hasNeedle: true,
        needleColor: 'rgba(212,30,38,1)',
        needleUpdateSpeed: 1000,
        arcColors: ['rgba(212,30,38,1)', 'yellow', 'blue', 'green'], // Define four colors here
        arcDelimiters: [20, 40, 60, 80], // Adjusted to within 0-100 range
        rangeLabel: ['00:00', '10:00'],
        centralLabel: '',
      };

      const gaugeChart = GaugeChart.gaugeChart(element, 300, gaugeOptions);

      if (gaugeChart) {
        let currentValue = this.AsaTime;
        const percentage = (currentValue / 10) * 100;
        gaugeChart.updateNeedle(percentage);
        const formattedTime = `${currentValue.toString().padStart(2, '0')}:00`;
        timeTextElement.textContent = `ASA time - ${formattedTime}`;
      } else {
        console.error('Failed to create gauge chart.');
      }
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
        arcColors: ['red', 'orange', 'yellow', 'blue', 'green'], // Define five colors here
        arcDelimiters: [20, 40, 60, 80], // Corresponding segments for the colors (adjusted range)
        rangeLabel: ['0%', '100%'],
      };

      const gaugeChart3 = GaugeChart.gaugeChart(element3, 300, gaugeOptions3);

      if (gaugeChart3) {
        let currentValue3 = this.thresholdServiceLevelPercentage; // Set the initial value to the boundary value
        gaugeChart3.updateNeedle(currentValue3); // Set the needle position initially

        // Update the text below the gauge chart to reflect the value
        percentageTextElement3.textContent = `Service Level - ${currentValue3.toFixed(2)}%`;
      } else {
        console.error('Failed to create gauge chart.');
      }
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
        arcColors: ['rgba(212,30,38,1)', 'orange', 'yellow', 'blue', 'green',], // Include rgba(212,30,38,1)
        arcDelimiters: [20, 40, 60, 80], // Adjusted to within 0-100 range
        rangeLabel: ['0%', '100%'],
      };

      const gaugeChart4 = GaugeChart.gaugeChart(element4, 300, gaugeOptions4);

      if (gaugeChart4) {
        let currentValue4 = this.PercentageOfACDtime; // Set the initial value to the boundary value
        gaugeChart4.updateNeedle(currentValue4); // Set the needle position initially

        // Update the text below the gauge chart to reflect the value
        percentageTextElement4.textContent = `ACD Time - ${currentValue4.toFixed(2)}%`;
      } else {
        console.error('Failed to create gauge chart.');
      }
    } else {
      console.error('Element with id "ACDTimeGaugeArea" or "ACDTimePercentageText" not found');
    }
  }



  // GaugeChartFor_AvgCallInteraction() {
  //   const element = document.querySelector('#gaugeArea') as HTMLElement;
  //   const timeTextElement = document.querySelector('#timeText') as HTMLElement;

  //   if (element && timeTextElement) {
  //     const gaugeOptions = {
  //       hasNeedle: true,
  //       needleColor: 'rgba(212,30,38,1)',
  //       needleUpdateSpeed: 1000,
  //       arcColors: ['rgba(212,30,38,1)', 'lightgray'],
  //       arcDelimiters: [70], // represents 70% of the gauge (adjust this for your specific needs)
  //       rangeLabel: ['00:00', '10:00'], // corresponds to 00:00 to 10:00
  //       // centralLabel: '5:00', // middle label if needed
  //     };

  //     const gaugeChart = GaugeChart.gaugeChart(element, 300, gaugeOptions);

  //     let currentValue = 7; // Set the initial value in minutes (e.g., 7 minutes)
  //     const percentage = (currentValue / 10) * 100; // convert minutes to a percentage of the maximum (10 minutes)
  //     gaugeChart.updateNeedle(percentage); // Set the needle position based on percentage

  //     // Format the time to display in HH:mm format
  //     const formattedTime = `${currentValue.toString().padStart(2, '0')}:00`;
  //     timeTextElement.textContent = `Avg. ACD time - ${formattedTime}`;
  //   } else {
  //     console.error('Element with id "gaugeArea" or "timeText" not found');
  //   }
  // }

  // ThresholdGaugeChart() {
  //   const element3 = document.querySelector('#thresholdGaugeArea') as HTMLElement;
  //   const percentageTextElement3 = document.querySelector('#thresholdPercentageText') as HTMLElement;

  //   if (element3 && percentageTextElement3) {
  //     const gaugeOptions3 = {
  //       hasNeedle: true,
  //       needleColor: 'green',
  //       needleUpdateSpeed: 1500,
  //       arcColors: ['green', 'lightgray'],
  //       arcDelimiters: [85],
  //       rangeLabel: ['0%', '100%'],
  //     };

  //     const gaugeChart3 = GaugeChart.gaugeChart(element3, 300, gaugeOptions3);

  //     let currentValue3 = 85; // Set the initial value to the boundary value
  //     gaugeChart3.updateNeedle(currentValue3); // Set the needle position initially

  //     // Update the text below the gauge chart to reflect the value
  //     percentageTextElement3.textContent = `Service Level - ${currentValue3.toFixed(2)}%`;
  //   } else {
  //     console.error('Element with id "thresholdGaugeArea" or "thresholdPercentageText" not found');
  //   }
  // }

  // ACDTimeGaugeChart() {
  //   const element4 = document.querySelector('#ACDTimeGaugeArea') as HTMLElement;
  //   const percentageTextElement4 = document.querySelector('#ACDTimePercentageText') as HTMLElement;

  //   if (element4 && percentageTextElement4) {
  //     const gaugeOptions4 = {
  //       hasNeedle: true,
  //       needleColor: 'green',
  //       needleUpdateSpeed: 1500,
  //       arcColors: ['green', 'lightgray'],
  //       arcDelimiters: [95],
  //       rangeLabel: ['0%', '100%'],
  //     };

  //     const gaugeChart4 = GaugeChart.gaugeChart(element4, 300, gaugeOptions4);

  //     let currentValue4 = 95; // Set the initial value to the boundary value
  //     gaugeChart4.updateNeedle(currentValue4); // Set the needle position initially

  //     // Update the text below the gauge chart to reflect the value
  //     percentageTextElement4.textContent = `ACD Time - ${currentValue4.toFixed(2)}%`;
  //   } else {
  //     console.error('Element with id "ACDTimeGaugeArea" or "ACDTimePercentageText" not found');
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
