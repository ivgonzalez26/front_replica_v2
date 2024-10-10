import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  apiUrl = 'http://20.97.157.219:8005/api/';
  options: any = {};

  constructor(private http: HttpClient) {
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    this.options = {headers: headers};
  }

  getStatus(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'StatusShop').toPromise();
  }

  getTramasLocal(rst_id: number, desde: Date, hasta: Date): Promise<any> {
    const desdeFormateada = desde.toISOString().slice(0, 10);
    const hastaFormateada = hasta.toISOString().slice(0, 10);
    let data = {
      "rst_id": rst_id,
      "fecha_inicio": desdeFormateada,
      "fecha_fin": hastaFormateada
    }
    return this.http.post<any>(this.apiUrl + 'routes/getByIdRestaurantAndDate', JSON.stringify(data), this.options).toPromise();
  }
}
