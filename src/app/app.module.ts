import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { DescriptionOfferComponent } from './description-offer/description-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatListModule, MatOptionModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatStepperModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashsellerComponent } from './dashseller/dashseller.component';
import { DashformComponent } from './dashform/dashform.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { environment } from 'src/environments/environment';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SelleroffersComponent } from './selleroffers/selleroffers.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterComponent,
    DescriptionOfferComponent,
    DashsellerComponent,
    DashformComponent,
    SelleroffersComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule, 
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule ,
    MatStepperModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    AgmCoreModule.forRoot({
      apiKey: environment['AIzaSyC6KXBkQGXUsIaF6u96_Q4EzUG8s0Q9OWE'],
      libraries: ['places']
    }),
    LeafletModule,

  ],
  exports: [
    MatButtonModule,
  ],
  
  providers: [HttpClientModule,GoogleMapsAPIWrapper,],
  bootstrap: [AppComponent]
})
export class AppModule { }
