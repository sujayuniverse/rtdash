
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { RestApiService } from 'src/app/rest-api.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { SetbaseurlService } from 'src/app/setbaseurl.service';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agentlist',
  templateUrl: './agentlist.page.html',
  styleUrls: ['./agentlist.page.scss'],
})
export class AgentlistPage implements OnInit {

  Site_url: string = "";
  AgentList: any =""

  
  
  // constructor(private router: Router) { }
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

      this.http.get(this.Site_url + 'get_detailAgentstats').subscribe(data => {
        this.AgentList = data;
        console.log('Agent List', this.AgentList);
      });

    
      // loading.dismiss();
    };

    // Call initially and then every 15 seconds
    fetchData();
    setInterval(fetchData, 15000); // 15 seconds interval in milliseconds
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
