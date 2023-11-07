import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agentlist',
  templateUrl: './agentlist.page.html',
  styleUrls: ['./agentlist.page.scss'],
})
export class AgentlistPage implements OnInit {

  constructor(private router: Router) { }



  
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
