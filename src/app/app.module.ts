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
import { HomeComponent } from './main-layout/home/home.component';
import { FooterComponent } from './main-layout/footer/footer.component';

import { ClientProductService } from './shared/services/client-product.service';
import { ProductCardComponent } from './main-layout/home/product-card/product-card.component';
import { LeftMenuComponent } from './main-layout/left-menu/left-menu.component';
import { TableComponent } from './shared/table/table.component';
import { ErrorComponent } from './shared/dialogs/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SeedsComponent,
    CropProtactionComponent,
    MineralFertilizersComponent,
    FeedsComponent,
    AboutComponent,
    ContactUsComponent,
    HomeComponent,
    FooterComponent,
    ProductCardComponent,
    LeftMenuComponent,
    TableComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot()
  ],
  providers: [
    ClientProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
