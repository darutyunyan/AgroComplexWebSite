import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyCookieService } from './cookie.service';
import { Observable } from 'rxjs';
import { ILoginResponse } from 'src/app/store/models/admins.model';

@Injectable()
export class AuthService {

  private readonly TOKEN: string = 'admin_token';

  constructor(
    private http: HttpClient,
    private cookieServ: MyCookieService) { }

  public login(request): Observable<object> {
    return this.http.post(`/Account/Login`, request);
  }

  public setToken(response: ILoginResponse): void {
    if (response) {
      this.cookieServ.set(this.TOKEN, response.token, { expiresInString: response.liveTime, SameSite: 'Strict' });
    } else {
      this.deleteToken();
    }
  }

  public deleteToken(): void {
    this.cookieServ.delete(this.TOKEN);
  }

  public getToken(): string {
    return this.cookieServ.get(this.TOKEN);
  }

  public logout(): void {
    this.deleteToken();
  }

  public isAuthenicated(): boolean {
    const isExist = this.cookieServ.check(this.TOKEN);

    if (!isExist) {
      this.logout();
    }

    return isExist;
  }
}
