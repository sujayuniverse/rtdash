// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { AlertController, LoadingController, ToastController } from '@ionic/angular';
// import { SetbaseurlService } from 'src/app/setbaseurl.service';
// import { RestApiService } from 'src/app/rest-api.service';
// import * as GaugeChart from 'gauge-chart';

// @Component({
//   selector: 'app-dailystats',
//   templateUrl: './dailystats.page.html',
//   styleUrls: ['./dailystats.page.scss'],
// })
// export class DailystatsPage implements OnInit {
//   Site_url: string = "";
//   DailyStatData: any = "";
//   AsaTime: number = 0;
//   thresholdServiceLevelPercentage: number = 0;
//   PercentageOfACDtime: number = 0;

//   gaugeChartAvgCallInteraction: any;
//   gaugeChartThresholdServiceLevel: any;
//   gaugeChartACDTime: any;
//   private fetchDataInterval: any;

//   constructor(
//     private router: Router,
//     private http: HttpClient,
//     private baseurl: SetbaseurlService,
//     public restApiService: RestApiService,
//     private alertCtrl: AlertController,
//     public loadingController: LoadingController,
//     private toastController: ToastController
//   ) {
//     this.Site_url = this.baseurl.Set_base_url;
//     // this.GetData();
//   }
//   ngOnInit() {
//     this.GetData();
//   }

//   ngAfterViewInit() {
//     this.updateCharts();
//   }

//   ionViewWillEnter() {
//     console.log("DailystatsPage :: ionViewWillEnter called");
//     this.GetData();
//   }

//   ionViewWillLeave() {
//     console.log("DailystatsPage :: ionViewWillLeave called");
//     if (this.fetchDataInterval) {
//       clearInterval(this.fetchDataInterval);
//       console.log("DailystatsPage fetchDataInterval cleared");
//     }
//   }

//   ngOnDestroy() {
//     console.log("DailystatsPage :: ngOnDestroy called");
//     if (this.fetchDataInterval) {
//       clearInterval(this.fetchDataInterval);
//       console.log("DailystatsPage fetchDataInterval cleared");
//     }
//   }


//   async GetData() {
//     const fetchData = async () => {
//       this.http.get<any>(this.Site_url + 'Get_DailyStats').subscribe(
//         (data) => {
//           this.DailyStatData = data;

//           if (this.DailyStatData) {
//             this.AsaTime = this.DailyStatData.AvgCallInteraction;
//             this.PercentageOfACDtime = this.DailyStatData.PercentageOfACDtime;
//             this.thresholdServiceLevelPercentage = this.DailyStatData.ThresholdServiceLevelPercentage;
//             console.log("AsaTime :" +this.AsaTime+ " , PercentageOfACDtime :"+this.PercentageOfACDtime +" , thresholdServiceLevelPercentage :"+this.thresholdServiceLevelPercentage)
//           }
//           this.updateCharts();
//         },
//         (error) => {
//           console.error('DailystatsPage:: Error fetching daily stats:', error);
//         }
//       );
//     };
//     // Clear any existing intervals before setting a new one
//     if (this.fetchDataInterval) {
//       clearInterval(this.fetchDataInterval);
//       console.log("DailystatsPage :: Previous fetchDataInterval cleared before setting new one");
//     }
//     if (this.fetchDataInterval) {
//       clearInterval(this.fetchDataInterval);
//       console.log("DailystatsPage :: Previous fetchDataInterval cleared before setting new one");
//     }

//     // Call initially and then every 15 seconds
//     fetchData();
//     this.fetchDataInterval = setInterval(fetchData, 15000); // 15 seconds interval in milliseconds
//     console.log("DailystatsPage :: fetchDataInterval set");
    
//   }

//   updateCharts() {
//     this.updateGaugeChartFor_AvgCallInteraction();
//     this.updateThresholdGaugeChart();
//     this.updateACDTimeGaugeChart();
//   }
//   updateGaugeChartFor_AvgCallInteraction() {
//     const element = document.querySelector('#gaugeArea') as HTMLElement;
//     const timeTextElement = document.querySelector('#timeText') as HTMLElement;
  
//     if (element && timeTextElement) {
//       const gaugeOptions = {
//         hasNeedle: true,
//         needleColor: 'rgba(212,30,38,1)',
//         needleUpdateSpeed: 1000,
//         arcColors: ['rgba(212,30,38,1)', 'yellow', 'blue', 'green'],
//         arcDelimiters: [20, 40, 60, 80],
//         rangeLabel: ['00:00', '10:00'],
//         centralLabel: '',
//       };
  
//       if (!this.gaugeChartAvgCallInteraction) {
//         this.gaugeChartAvgCallInteraction = GaugeChart.gaugeChart(element, 300, gaugeOptions);
//       }
  
//       // Check if AsaTime is a number, convert to string if necessary
//       let asaTimeString: string;
//       if (typeof this.AsaTime === 'number') {
//         // Assuming AsaTime is in seconds if it's a number
//         const minutes = Math.floor(this.AsaTime / 60);
//         const seconds = this.AsaTime % 60;
//         asaTimeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//       } else {
//         asaTimeString = this.AsaTime;
//       }
  
//       // Convert ASA time from mm:ss to total seconds
//       const [minutes, seconds] = asaTimeString.split(':').map(Number);
//       const totalSeconds = (minutes * 60) + seconds;
  
//       // Assuming maximum ASA time is 10 minutes (600 seconds)
//       const maxSeconds = 600;
//       const percentage = (totalSeconds / maxSeconds) * 100;
  
//       this.gaugeChartAvgCallInteraction.updateNeedle(percentage);
//       timeTextElement.textContent = `ASA time - ${asaTimeString}`;
//     } else {
//       console.error('DailystatsPage :: Element with id "gaugeArea" or "timeText" not found');
//     }
//   }
  
//   // updateGaugeChartFor_AvgCallInteraction() {
//   //   const element = document.querySelector('#gaugeArea') as HTMLElement;
//   //   const timeTextElement = document.querySelector('#timeText') as HTMLElement;

//   //   if (element && timeTextElement) {
//   //     const gaugeOptions = {
//   //       hasNeedle: true,
//   //       needleColor: 'rgba(212,30,38,1)',
//   //       needleUpdateSpeed: 1000,
//   //       arcColors: ['rgba(212,30,38,1)', 'yellow', 'blue', 'green'],
//   //       arcDelimiters: [20, 40, 60, 80],
//   //       rangeLabel: ['00:00', '10:00'],
//   //       centralLabel: '',
//   //     };

//   //     if (!this.gaugeChartAvgCallInteraction) {
//   //       this.gaugeChartAvgCallInteraction = GaugeChart.gaugeChart(element, 300, gaugeOptions);
//   //     }

//   //     const percentage = (this.AsaTime / 10) * 100;
//   //     this.gaugeChartAvgCallInteraction.updateNeedle(percentage);
//   //     const formattedTime = `${this.AsaTime.toString().padStart(2, '0')}:00`;
//   //     timeTextElement.textContent = `ASA time - ${formattedTime}`;
//   //   } else {
//   //     console.error('DailystatsPage :: Element with id "gaugeArea" or "timeText" not found');
//   //   }
//   // }

//   updateThresholdGaugeChart() {
//     const element = document.querySelector('#thresholdGaugeArea') as HTMLElement;
//     const percentageTextElement = document.querySelector('#thresholdPercentageText') as HTMLElement;

//     if (element && percentageTextElement) {
//       const gaugeOptions = {
//         hasNeedle: true,
//         needleColor: 'green',
//         needleUpdateSpeed: 1500,
//         arcColors: ['red', 'orange', 'yellow', 'blue', 'green'],
//         arcDelimiters: [20, 40, 60, 80],
//         rangeLabel: ['0%', '100%'],
//       };

//       if (!this.gaugeChartThresholdServiceLevel) {
//         this.gaugeChartThresholdServiceLevel = GaugeChart.gaugeChart(element, 300, gaugeOptions);
//       }

//       this.gaugeChartThresholdServiceLevel.updateNeedle(this.thresholdServiceLevelPercentage);
//       percentageTextElement.textContent = `Service Level - ${this.thresholdServiceLevelPercentage.toFixed(2)}%`;
//     } else {
//       console.error('DailystatsPage :: Element with id "thresholdGaugeArea" or "thresholdPercentageText" not found');
//     }
//   }

//   updateACDTimeGaugeChart() {
//     const element = document.querySelector('#ACDTimeGaugeArea') as HTMLElement;
//     const percentageTextElement = document.querySelector('#ACDTimePercentageText') as HTMLElement;

//     if (element && percentageTextElement) {
//       const gaugeOptions = {
//         hasNeedle: true,
//         needleColor: 'green',
//         needleUpdateSpeed: 1500,
//         arcColors: ['rgba(212,30,38,1)', 'orange', 'yellow', 'blue', 'green'],
//         arcDelimiters: [20, 40, 60, 80],
//         rangeLabel: ['0%', '100%'],
//       };

//       if (!this.gaugeChartACDTime) {
//         this.gaugeChartACDTime = GaugeChart.gaugeChart(element, 300, gaugeOptions);
//       }

//       this.gaugeChartACDTime.updateNeedle(this.PercentageOfACDtime);
//       percentageTextElement.textContent = `ACD Time - ${this.PercentageOfACDtime.toFixed(2)}%`;
//     } else {
//       console.error('DailystatsPage :: Element with id "ACDTimeGaugeArea" or "ACDTimePercentageText" not found');
//     }
//   }

//   async Home() {
//     this.router.navigate(['/dashboard']);
//   }

//   async Agents() {
//     this.router.navigate(['/agentlist']);
//   }

//   async ServiceLevel() {
//     this.router.navigate(['/servicelevel']);
//   }

//   async DailyStats() {
//     this.router.navigate(['/dailystats']);
//   }
// }





import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { SetbaseurlService } from 'src/app/setbaseurl.service';
import { RestApiService } from 'src/app/rest-api.service';
import * as GaugeChart from 'gauge-chart';

@Component({
  selector: 'app-dailystats',
  templateUrl: './dailystats.page.html',
  styleUrls: ['./dailystats.page.scss'],
})
export class DailystatsPage implements OnInit {
  Site_url: string = "";
  DailyStatData: any = "";
  AsaTime: string = "00:00"; // Initialize as string to represent mm:ss
  thresholdServiceLevelPercentage: number = 0;
  ACDtime: string = "00:00";

  gaugeChartAvgCallInteraction: any;
  gaugeChartThresholdServiceLevel: any;
  gaugeChartACDTime: any;
  private fetchDataInterval: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private baseurl: SetbaseurlService,
    public restApiService: RestApiService,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.Site_url = this.baseurl.Set_base_url;
  }

  ngOnInit() {
    this.GetData();
  }

  ngAfterViewInit() {
    this.updateCharts();
  }

  ionViewWillEnter() {
    console.log("DailystatsPage :: ionViewWillEnter called");
    this.GetData();
  }

  ionViewWillLeave() {
    console.log("DailystatsPage :: ionViewWillLeave called");
    if (this.fetchDataInterval) {
      clearInterval(this.fetchDataInterval);
      console.log("DailystatsPage fetchDataInterval cleared");
    }
  }

  ngOnDestroy() {
    console.log("DailystatsPage :: ngOnDestroy called");
    if (this.fetchDataInterval) {
      clearInterval(this.fetchDataInterval);
      console.log("DailystatsPage fetchDataInterval cleared");
    }
  }

  async GetData() {
    const fetchData = async () => {
      this.http.get<any>(this.Site_url + 'Get_DailyStats').subscribe(
        (data) => {
          this.DailyStatData = data;

          if (this.DailyStatData) {
            this.AsaTime = this.DailyStatData.AvgCallInteraction;
            this.ACDtime = this.DailyStatData.PercentageOfACDtime;
            this.thresholdServiceLevelPercentage = Number(this.DailyStatData.ThresholdServiceLevelPercentage);
            console.log("AsaTime: " + this.AsaTime + " , ACD time: " + this.ACDtime + " , thresholdServiceLevelPercentage: " + this.thresholdServiceLevelPercentage)
          }
          this.updateCharts();
        },
        (error) => {
          console.error('DailystatsPage:: Error fetching daily stats:', error);
        }
      );
    };

    if (this.fetchDataInterval) {
      clearInterval(this.fetchDataInterval);
      console.log("DailystatsPage :: Previous fetchDataInterval cleared before setting new one");
    }

    fetchData();
    this.fetchDataInterval = setInterval(fetchData, 15000); // 15 seconds interval in milliseconds
    console.log("DailystatsPage :: fetchDataInterval set");
  }

  updateCharts() {
    this.updateGaugeChartFor_AvgCallInteraction();
    this.updateThresholdGaugeChart();
    this.updateACDTimeGaugeChart();
  }

  updateGaugeChartFor_AvgCallInteraction() {
    const element = document.querySelector('#gaugeArea') as HTMLElement;
    const timeTextElement = document.querySelector('#timeText') as HTMLElement;

    if (element && timeTextElement) {
      const gaugeOptions = {
        hasNeedle: true,
        needleColor: 'green',
        needleUpdateSpeed: 1000,
        arcColors: ['green', 'orange', 'yellow', 'blue','rgba(212,30,38,1)'],
        arcDelimiters: [20, 40, 60, 80],
        rangeLabel: ['00:00', '10:00'],
        centralLabel: '',
      };

      if (!this.gaugeChartAvgCallInteraction) {
        this.gaugeChartAvgCallInteraction = GaugeChart.gaugeChart(element, 300, gaugeOptions);
      }

      const [minutes, seconds] = this.AsaTime.split(':').map(Number);
      const totalSeconds = (minutes * 60) + seconds;

      const maxSeconds = 600; // 10 minutes
      const percentage = (totalSeconds / maxSeconds) * 100;

      this.gaugeChartAvgCallInteraction.updateNeedle(percentage);
      timeTextElement.textContent = `ASA time - ${this.AsaTime}`;
    } else {
      console.error('DailystatsPage :: Element with id "gaugeArea" or "timeText" not found');
    }
  }

  updateThresholdGaugeChart() {
    const element = document.querySelector('#thresholdGaugeArea') as HTMLElement;
    const percentageTextElement = document.querySelector('#thresholdPercentageText') as HTMLElement;

    if (element && percentageTextElement) {
      const gaugeOptions = {
        hasNeedle: true,
        needleColor: 'green',
        needleUpdateSpeed: 1500,
        arcColors: ['rgba(212,30,38,1)', 'orange', 'yellow', 'blue', 'green'],
        arcDelimiters: [20, 40, 60, 80],
        rangeLabel: ['0%', '100%'],
      };

      if (!this.gaugeChartThresholdServiceLevel) {
        this.gaugeChartThresholdServiceLevel = GaugeChart.gaugeChart(element, 300, gaugeOptions);
      }

      this.gaugeChartThresholdServiceLevel.updateNeedle(this.thresholdServiceLevelPercentage);
      percentageTextElement.textContent = `Service Level - ${this.thresholdServiceLevelPercentage.toFixed(2)}%`;
    } else {
      console.error('DailystatsPage :: Element with id "thresholdGaugeArea" or "thresholdPercentageText" not found');
    }
  }

  updateACDTimeGaugeChart() {
    const element = document.querySelector('#ACDTimeGaugeArea') as HTMLElement;
    const percentageTextElement = document.querySelector('#ACDTimePercentageText') as HTMLElement;

    if (element && percentageTextElement) {
      const gaugeOptions = {
        hasNeedle: true,
        needleColor: 'green',
        needleUpdateSpeed: 1500,
        arcColors: ['rgba(212,30,38,1)', 'orange', 'yellow', 'blue', 'green'],
        arcDelimiters: [20, 40, 60, 80],
        rangeLabel: ['00:00', '30:00'],
      };

      if (!this.gaugeChartACDTime) {
        this.gaugeChartACDTime = GaugeChart.gaugeChart(element, 300, gaugeOptions);
      }


      const [minutes, seconds] = this.ACDtime.split(':').map(Number);
      const totalSeconds = (minutes * 60) + seconds;

      const maxSeconds = 1800; // 30 minutes
      const percentage = (totalSeconds / maxSeconds) * 100;

      this.gaugeChartACDTime.updateNeedle(percentage);
      percentageTextElement.textContent = `ACD Time - ${this.ACDtime}`;
    } else {
      console.error('DailystatsPage :: Element with id "ACDTimeGaugeArea" or "ACDTimePercentageText" not found');



    //   this.gaugeChartACDTime.updateNeedle(this.ACDtime);
    //   percentageTextElement.textContent = `ACD Time - ${this.ACDtime.toFixed(2)}%`;
    // } else {
    //   console.error('DailystatsPage :: Element with id "ACDTimeGaugeArea" or "ACDTimePercentageText" not found');
    // }
    }
  }


  // updateACDTimeGaugeChart1() {
  //   const element = document.querySelector('#ACDTimeGaugeArea') as HTMLElement;
  //   const percentageTextElement = document.querySelector('#ACDTimePercentageText') as HTMLElement;

  //   if (element && percentageTextElement) {
  //     const gaugeOptions = {
  //       hasNeedle: true,
  //       needleColor: 'green',
  //       needleUpdateSpeed: 1500,
  //       arcColors: ['rgba(212,30,38,1)', 'orange', 'yellow', 'blue', 'green'],
  //       arcDelimiters: [20, 40, 60, 80],
  //       rangeLabel: ['0%', '100%'],
  //     };

  //     if (!this.gaugeChartACDTime) {
  //       this.gaugeChartACDTime = GaugeChart.gaugeChart(element, 300, gaugeOptions);
  //     }

  //     this.gaugeChartACDTime.updateNeedle(this.ACDtime);
  //     percentageTextElement.textContent = `ACD Time - ${this.ACDtime.toFixed(2)}%`;
  //   } else {
  //     console.error('DailystatsPage :: Element with id "ACDTimeGaugeArea" or "ACDTimePercentageText" not found');
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
}
