import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SeedsComponent } from './main-layout/seeds/seeds.component';
import { CropProtactionComponent } from './main-layout/crop-protaction/crop-protaction.component';
import { MineralFertilizersComponent } from './main-layout/mineral-fertilizers/mineral-fertilizers.component';
import { FeedsComponent } from './main-layout/feeds/feeds.component';
import { AboutComponent } from './main-layout/about/about.component';
import { ContactUsComponent } from './main-layout/contact-us/contact-us.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SeedsComponent,
    CropProtactionComponent,
    MineralFertilizersComponent,
    FeedsComponent,
    AboutComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
