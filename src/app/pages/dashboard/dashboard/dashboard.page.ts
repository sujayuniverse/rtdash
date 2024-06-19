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
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  @ViewChild('pieChartCanvas5', { static: false }) pieChartCanvas5?: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas6', { static: false }) pieChartCanvas6?: ElementRef<HTMLCanvasElement>;

  selectedOption: any
  Site_url: string = "";
  SchoolId: string = "";
  AnsweredCalls: any = "";
  AbandonedCalls: any = "";
  LiveCallStats: any = "";
  Agentstats: any = "";
  SkillStatList: any = "";
  // SchoolAdmissionList: any = "";
  // private fetchDataInterval: any;

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

      this.http.get(this.Site_url + 'get_answeredcalls').subscribe(data => {
        this.AnsweredCalls = data;
        console.log('Answered Calls', this.AnsweredCalls);
        this.createChart(this.pieChartCanvas5, [this.AnsweredCalls.NonAnsweredPercentage, this.AnsweredCalls.AnsweredPercentage], ['#f6fcfd', '#d31d25']);
      });

      this.http.get(this.Site_url + 'get_abandonedCalls').subscribe(data => {
        this.AbandonedCalls = data;
        console.log('Abandoned Calls', this.AbandonedCalls);
        this.createChart(this.pieChartCanvas6, [this.AbandonedCalls.NonAbandonPercentage, this.AbandonedCalls.AbandonPercentage], ['#f6fcfd', '#d31d25']);
      });

      this.http.get(this.Site_url + 'getLiveCallStats').subscribe(data => {
        this.LiveCallStats = data;
        console.log('Live Call Stats', this.LiveCallStats);
      });

      this.http.get(this.Site_url + 'get_Agentstats').subscribe(data => {
        this.Agentstats = data;
        console.log('Agent stats', this.Agentstats);
      });

      this.http.get(this.Site_url + 'getSkillstats').subscribe(data => {
        this.SkillStatList = data;
        console.log('Skill Stat List', this.SkillStatList);
      });

      // loading.dismiss();
    };

    // Call initially and then every 15 seconds
    fetchData();
    setInterval(fetchData, 15000); // 15 seconds interval in milliseconds
  }


  private createChart(canvas: ElementRef<HTMLCanvasElement> | undefined, data: number[], colors: string[]) {
    if (canvas) {
      const chartCtx = canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

      if (chartCtx) {
        const existingChart = (canvas.nativeElement as any).myChart;
        if (existingChart) {
          existingChart.destroy();
        }

        const chartData = {
          datasets: [{
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
          }],
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

        const newChart = new Chart(chartCtx, {
          type: 'doughnut',
          data: chartData,
          // options: options,
        });

        (canvas.nativeElement as any).myChart = newChart;
      }
    }
  }



  //footer start
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
