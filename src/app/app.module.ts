import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http'

import { AppComponent } from './app.component';
import { TopNavComponent } from './topnav/topnav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HoteldetailComponent } from './hoteldetail/hoteldetail.component';
import { PaymentComponent } from './payment/payment.component';
import { DataService } from './services/data.service';
import { HotelDataService } from './services/hoteldata.servcie';
import { PhoneFormatPipe } from './pipes/phone.pipe';
import { RestrictCharacterDirective } from './directives/restrictcharacter.directive';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HotelsComponent,
    HoteldetailComponent,
    PaymentComponent,
    // pipe
    PhoneFormatPipe,
    //directive
    RestrictCharacterDirective,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([{ path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'home', component: HomeComponent },
    { path: 'hotels', component: HotelsComponent },
    {path: 'payment', component: PaymentComponent}
  ])
  ],
  providers: [DataService, HotelDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
