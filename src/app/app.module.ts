import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { SeedsComponent } from './seeds/seeds.component';
import { CropProtactionComponent } from './crop-protaction/crop-protaction.component';
import { MineralFertilizersComponent } from './mineral-fertilizers/mineral-fertilizers.component';
import { FeedsComponent } from './feeds/feeds.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
