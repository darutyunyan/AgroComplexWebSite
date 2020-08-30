import { Injectable, isDevMode } from '@angular/core';
import { CookieOptions } from '../interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class MyCookieService {

    constructor(private cookiesServ: CookieService) { }

    set(name, value, options: CookieOptions) {
        options.secure = isDevMode ? false : true;

        options.expires = new Date(new Date().getTime() + +options.expiresInString * 1000);

        this.cookiesServ.set(name, value, options.expires, '/', null, options.secure);
    }

    get(name) {
        return this.cookiesServ.get(name);
    }

    check(name) {
        return this.cookiesServ.check(name);
    }

    delete(name) {
        this.cookiesServ.delete(name, '/', null, isDevMode() ? false : true);
    }

}
