import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AddColumnTypeComponent } from './admin-layout/add-column-type/add-column-type.component';
import { AddProductNameComponent } from './admin-layout/add-product-name/add-product-name.component';
import { AddProductTypeComponent } from './admin-layout/add-product-type/add-product-type.component';
import { AddProductComponent } from './admin-layout/add-product/add-product.component';
import { DashboardComponent } from './admin-layout/dashboard/dashboard.component';
import { LoginComponent } from './admin-layout/login/login.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoaderComponent } from '../admin/admin-layout/loader/loader.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AuthService } from './shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from './shared/services/product.service';
import { MyCookieService } from './shared/services/cookie.service';
import { SearchPipe } from './shared/search.pipe';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginComponent,
        DashboardComponent,
        AddProductComponent,
        AddColumnTypeComponent,
        AddProductNameComponent,
        AddProductTypeComponent,
        LoaderComponent,
        SearchPipe,
    ],
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: AuthInterceptor
        },
        CookieService,
        MyCookieService,
        AuthService,
        ProductService
    ]
})

export class AdminModule {
}
