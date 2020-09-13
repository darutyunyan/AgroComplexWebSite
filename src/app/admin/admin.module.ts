import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { AddColumnTypeComponent } from './add-column-type/add-column-type.component';
import { AddProductNameComponent } from './add-product-name/add-product-name.component';
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginComponent,
        DashboardComponent,
        AddProductComponent,
        AddColumnTypeComponent,
        AddProductNameComponent,
        AddProductTypeComponent
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
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
                    { path: 'login', component: LoginComponent },
                    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
                    { path: 'add-product-name', component: AddProductNameComponent, canActivate: [AuthGuard]},
                    { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
                    { path: 'add-column-type', component: AddColumnTypeComponent, canActivate: [AuthGuard]},
                    { path: 'add-product-type', component: AddProductTypeComponent, canActivate: [AuthGuard]}
                ]
            }
        ])
    ],
    exports: [RouterModule]
})

export class AdminModule {
}
