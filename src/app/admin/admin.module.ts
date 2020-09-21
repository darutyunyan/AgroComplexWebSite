import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './shared/auth.guard';

import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddColumnTypeComponent } from './add-column-type/add-column-type.component';
import { AddProductNameComponent } from './add-product-name/add-product-name.component';
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AuthService } from './shared/services/auth.service';
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
        SearchPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        FlexLayoutModule,
        HttpClientModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
                    { path: 'login', component: LoginComponent },
                    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
                    { path: 'add-product-name', component: AddProductNameComponent, canActivate: [AuthGuard] },
                    { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
                    { path: 'add-column-type', component: AddColumnTypeComponent, canActivate: [AuthGuard] },
                    { path: 'add-product-type', component: AddProductTypeComponent, canActivate: [AuthGuard] }
                ]
            }
        ])
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
        ProductService,
        AuthGuard
    ],
    exports: [RouterModule]
})

export class AdminModule {
}
