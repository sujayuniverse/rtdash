import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  base_url = ' http://localhost:62581/api/';
  constructor(public http: HttpClient)
  {
 
   }
  
  SaveUser(dataToSend:any){
    let url = this.base_url + 'get_login';
    return this.http.post(url, dataToSend,
      {
        headers: new HttpHeaders(
        {'content-Type': 'application/json'}
        )
      }
      );

  }

  
}
