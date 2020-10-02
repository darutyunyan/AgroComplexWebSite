import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { FeedsComponent } from './feeds/feeds.component';
import { CropProtactionComponent } from './crop-protaction/crop-protaction.component';
import { MineralFertilizersComponent } from './mineral-fertilizers/mineral-fertilizers.component';
import { SeedsComponent } from './seeds/seeds.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

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
