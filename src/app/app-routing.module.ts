import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FeedsComponent } from './main-layout/feeds/feeds.component';
import { CropProtactionComponent } from './main-layout/crop-protaction/crop-protaction.component';
import { MineralFertilizersComponent } from './main-layout/mineral-fertilizers/mineral-fertilizers.component';
import { SeedsComponent } from './main-layout/seeds/seeds.component';
import { AboutComponent } from './main-layout/about/about.component';
import { ContactUsComponent } from './main-layout/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'seeds', component: SeedsComponent },
      { path: 'cropProtaction', component: CropProtactionComponent },
      { path: 'mineralFertilizers', component: MineralFertilizersComponent },
      { path: 'feeds', component: FeedsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contactUs', component: ContactUsComponent }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
