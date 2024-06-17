import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetbaseurlService {
  Set_base_url = 'http://localhost:62581/api/';
  //'https://ccmobuat.ucb.com.bd:8443/api/'
  // 
  constructor() { }
}
