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

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginComponent,
        DashboardComponent,
        AddProductComponent,
        AddColumnTypeComponent,
        AddProductNameComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
                    { path: 'login', component: LoginComponent },
                    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
                    { path: 'add-product-name', component: AddProductNameComponent, canActivate: [AuthGuard]},
                    { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
                    { path: 'add-column-type', component: AddColumnTypeComponent, canActivate: [AuthGuard]},
                    
                ]
            }
        ])
    ],
    exports: [RouterModule]
})

export class AdminModule {
}
