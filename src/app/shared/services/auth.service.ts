import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyCookieService } from './cookie.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly TOKEN = 'admin_token';

  constructor(
    private http: HttpClient,
    private cookieServ: MyCookieService) { }
        
    login(request) {
      return this.http.post(`${environment.agroComplexWebServiceUrl}/Account/Login`, request);
    }

  setToken(response) {
    if (response) {
      this.cookieServ.set(this.TOKEN, response.token, { expiresInString: response.liveTime, 'SameSite': 'Strict' });
    } else {
      this.deleteToken();
    }
  }

  deleteToken(){
    this.cookieServ.delete(this.TOKEN);
  }

  getToken() {
    return this.cookieServ.get(this.TOKEN);
  }

  logout() {
    this.deleteToken();
  }

  isAuthenicated() {
    const isExist = this.cookieServ.check(this.TOKEN);

    if (!isExist) {
      this.logout();
    }

    return isExist;
  }
}
