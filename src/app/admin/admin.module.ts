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
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store';
import { EffectsModule } from '@ngrx/effects';
import { ProductTypeEffects } from '../store/effects/admin/productType.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ColumnTypeEffects } from '../store/effects/admin/columnType.effects';
import { ProductNameEffects } from '../store/effects/admin/productName.effects';
import { ProductEffects } from '../store/effects/admin/product.effects';
import { TableProductComponent } from './admin-layout/dashboard/table-product/table-product.component';

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
        TableProductComponent
    ],
    imports: [
        SharedModule,
        AdminRoutingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([ProductTypeEffects, ColumnTypeEffects, ProductNameEffects, ProductEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
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
