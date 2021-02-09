import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ProductsComponent } from './main-layout/products/products.component';
import { AboutComponent } from './main-layout/about/about.component';
import { ContactUsComponent } from './main-layout/contact-us/contact-us.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './main-layout/home/home.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { ClientProductService } from './shared/services/client-product.service';
import { ProductCardComponent } from './main-layout/home/product-card/product-card.component';
import { LeftMenuComponent } from './main-layout/products/left-menu/left-menu.component';
import { TableComponent } from './main-layout/products/table/table.component';
import { ErrorComponent } from './shared/dialogs/error/error.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { clientEffects } from './store/effects/client/index';
import { clientReducers } from './store/reducers/client';
import { ContactUsService } from './shared/services/contact-us.service';
import { LocationService } from './shared/services/location.service';
import { ShortFeedbackComponent } from './main-layout/footer/short-feedback/short-feedback.component';
import { SocialsInfoComponent } from './main-layout/footer/socials-info/socials-info.component';
import { LocationComponent } from './main-layout/footer/location/location.component';
import { OnlineRequestComponent } from './shared/dialogs/online-request/online-request.component';
import { AngularYandexMapsModule, YA_CONFIG } from 'angular8-yandex-maps';
import { MapComponent } from './main-layout/footer/location/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AboutComponent,
    ContactUsComponent,
    HomeComponent,
    FooterComponent,
    ProductCardComponent,
    LeftMenuComponent,
    TableComponent,
    ErrorComponent,
    ProductsComponent,
    ShortFeedbackComponent,
    SocialsInfoComponent,
    LocationComponent,
    OnlineRequestComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    StoreModule.forRoot(clientReducers),
    EffectsModule.forRoot(clientEffects),
    AngularYandexMapsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    ClientProductService,
    ContactUsService,
    LocationService,
    {
      provide: YA_CONFIG,
      useValue: {
        apikey: '70dc92e1-6451-41a2-ac56-3897ba0ef065',
        lang: 'ru_RU',
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
