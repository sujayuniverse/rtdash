import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;
  constructor( private router: Router) {
    this.sideMenu();
  }

  sideMenu() {
    this.navigate =
      [
        {
          title: "Home",
          url: "/dashboard",
          icon: "home"
        },
        {
          title: "Agent",
          url: "/agentlist",
          icon: "people"
        },
        {
          title: "Service Level",
          url: "/servicelevel",
          icon: "pie-chart"
        },
        {
          title: "Daily Stats",
          url: "/dailystats",
          icon: "stats-chart"
        }
        // {
        //   title: "My Profile",
        //   url: "/myprofile",
        //   icon: "people"
        // },
  
      ]
  }
}
