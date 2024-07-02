import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from 'src/app/rest-api.service';
import { SetbaseurlService } from 'src/app/setbaseurl.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Username: string = "";
  Password: string = "";
  Site_url: string = "";
  ReturnString: string = ""

  constructor(private router: Router,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private http: HttpClient,
    private baseurl: SetbaseurlService,
    public restApiService: RestApiService,
    private activatedRoute: ActivatedRoute) {
  }



  async Login() {
    if ((this.Username == null || this.Username == '') ||
      (this.Password == null || this.Password == '')) {
      this.showError('Please fill the mandatory fields.')
    }
    else {
      if (this.Username != "" && this.Username != "") {
        const loading = await this.loadingController.create({
          message: 'Please wait',
          duration: 7000
        });
        await loading.present();

        var dataToSend =
        {
          "Username": this.Username,
          "Password": this.Password,
        };

        this.restApiService.SaveUser(dataToSend).subscribe(dataReturnFromService => {
          console.log(dataReturnFromService)
          if (dataReturnFromService == "Valid") {
            loading.dismiss();
            this.showError('Welcome ' + this.Username)
            this.Username = "";
            this.Password = "";
            this.router.navigate(['/dashboard']);
          }
          else {
            this.showError('Invalid credentials. Please try again later.')
            this.Username = "";
            this.Password = "";
            loading.dismiss()
          }
        })
      }
    }

  }

  async showError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();

  }



  // async Login() {
  //   if (this.EmailId == '' || this.EmailId == null) {
  //     this.showError('Please enter registered email id')
  //   }
  //   else {
  //     const loading = await this.loadingController.create({
  //       message: 'Please wait',
  //       duration: 10000
  //     });
  //     await loading.present();
  //     if (this.EmailId == "admin@gmail.com" && this.password == "1234") {
  //       this.router.navigate(['/dashboard']);
  //       this.EmailId = '';
  //       this.password = '';
  //     }
  //     else {
  //       this.EmailId = '';
  //       this.password = '';
  //       this.showError('Please enter valid credentials')
  //     }
  //     loading.dismiss()

  //   }
  // }

  // async showError(message: string) {
  //   const toast = await this.toastController.create({
  //     message: message,
  //     duration: 3000,
  //   });
  //   toast.present();

  // }

  ngOnInit() {
  }

}
