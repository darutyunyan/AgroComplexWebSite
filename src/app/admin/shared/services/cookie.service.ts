import { Injectable, isDevMode } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieOptions } from 'src/app/shared/interfaces';

@Injectable()
export class MyCookieService {

    constructor(private cookiesServ: CookieService) { }

    set(name: string, value: string, options: CookieOptions) {
        options.secure = isDevMode ? false : true;

        options.expires = new Date(new Date().getTime() + +options.expiresInString * 1000);

        this.cookiesServ.set(name, value, options.expires, '/', null, options.secure);
    }

    get(name: string) {
        return this.cookiesServ.get(name);
    }

    check(name: string) {
        return this.cookiesServ.check(name);
    }

    delete(name: string) {
        this.cookiesServ.delete(name, '/', null, isDevMode() ? false : true);
    }

}
