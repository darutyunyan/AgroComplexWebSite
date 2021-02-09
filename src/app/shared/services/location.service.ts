import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl: string) { }

  public getCoordinates(): Observable<any> {
    return this.http.get(`${this.baseUrl}/location/getCoordinates`);
  }
}
