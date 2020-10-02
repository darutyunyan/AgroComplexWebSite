import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { catchError, filter, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ProductService } from './services/product.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private router: Router,
        @Inject('baseUrl') private baseUrl: string,
        private prodServ: ProductService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.prodServ.runLoader(true);

        if (this.auth.isAuthenicated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
        }

        const mainReq = req.clone({
            url: `${this.baseUrl}${req.url}`
        });

        return next.handle(mainReq)
            .pipe(
                filter(this._isHttpResponse),
                map((res) => {
                    if (res.body.serviceError != null) {
                        console.log(res.body.serviceError.message);
                    }
                    this.prodServ.runLoader(false);
                    return res;
                }),
                catchError(error => {
                    if (error.status === 401) {
                        this.auth.logout();
                        this.router.navigate(['/admin', 'login']);
                    }

                    console.log(error);
                    this.prodServ.runLoader(false);
                    return throwError(error);
                })
            );
    }

    private _isHttpResponse(event: HttpEvent<any>): event is HttpResponse<any> {
        return event instanceof HttpResponse;
    }
}
