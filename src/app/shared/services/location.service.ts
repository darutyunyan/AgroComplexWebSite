import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl: string) { }

  public addOrUpdateCoordinates(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/location/addOrUpdateCoordinates`, request);
  }

  public getCoordinates(): Observable<any> {
    return this.http.get(`${this.baseUrl}/location/getCoordinates`);
  }
}
