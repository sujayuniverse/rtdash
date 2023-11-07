import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  EmailId: string = ""
  password : string = ""
    constructor(private router: Router,
      private alertCtrl: AlertController,
      public loadingController: LoadingController,
      private toastController: ToastController) {
  
    }
  
  
  
    async Login() {
      if (this.EmailId == '' || this.EmailId == null) {
        this.showError('Please enter registered email id')
      }
      else{
        const loading = await this.loadingController.create({
          message: 'Please wait',
          duration: 10000
        });
        await loading.present();
        if(this.EmailId == "admin@gmail.com"){
          this.router.navigate(['/dashboard']);
      
        }
        else{
          this.showError('Please enter the registered phone number')
  
        }
        loading.dismiss()
        
      }
    }
  
    async showError(message: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 3000,
      });
      toast.present();
  
    }
  
  ngOnInit() {
  }

}
