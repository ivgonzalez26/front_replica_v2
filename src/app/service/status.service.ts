import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  apiUrl = 'http://20.97.157.219:8005/api/StatusShop';

  constructor(private http: HttpClient) { }

  getStatus(): Promise<any> {
    return this.http.get<any>(this.apiUrl).toPromise();
  }

}
