import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
import { httpInterceptorProviders } from './auth';
import { LoginService } from './service/login.service';

import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


//import { OrdersComponent } from './modules/admin/orders/orders.component';
//import { ProductsComponent } from './modules/admin/products/products.component';
//import { MessagesComponent } from './messages/messages.component';


import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';

import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DatePipe } from '@angular/common';





@NgModule({
  declarations: [
    AppComponent,
    //OrdersComponent,
    //ProductsComponent,
    //MessagesComponent,

    
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatDividerModule,
    

  ],
  providers: [httpInterceptorProviders,    LoginService, DatePipe
    
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
