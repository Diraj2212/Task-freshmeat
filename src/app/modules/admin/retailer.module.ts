import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetailerRoutingModule } from './retailer-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatSidenavModule}  from '@angular/material/sidenav';
import{MatIconModule} from '@angular/material/icon';
import{MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list'
import {MatMenuModule} from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import { AddemployeeComponent } from './employee/addemployee/addemployee.component';
import { ViewemployeeComponent } from './employee/viewemployee/viewemployee.component';
import{ MatCardModule} from '@angular/material/card';
import { UpdateemployeeComponent } from './employee/updateemployee/updateemployee.component';
import { InventoryComponent } from './reports/inventory/inventory.component';
import { SalesComponent } from './reports/sales/sales.component';
import { PurchaseComponent } from './reports/purchase/purchase.component';
import { ExpenseControlComponent } from './reports/expense-control/expense-control.component';
import { AddsupplierComponent } from './suppliers/addsupplier/addsupplier.component';
import { ViewsuppliersComponent } from './suppliers/viewsuppliers/viewsuppliers.component';
import { UpdatesupplierComponent } from './suppliers/updatesupplier/updatesupplier.component';
import { MessagesComponent } from './messages/messages.component'
import{ViewemployeedetailsComponent} from 'src/app/modules/admin/employee/viewemployeedetails/viewemployeedetails.component'

import { OrdersComponent } from './orders/orders.component';

import { DateRangeComponent } from './orders/date-range';
import { SalesorderComponent } from './orders/salesorder/salesorder.component';
import { InventorySummaryComponent } from './reports/inventory/inventory-summary/inventory-summary.component';
import { PurchaseorderComponent } from './orders/purchaseorder/purchaseorder.component';
import { RaisePOComponent } from './orders/raisePo/raisepo.component';
import { POSummaryComponent } from './orders/posummary/posummary.component';

@NgModule({
  declarations: [
    NavBarComponent,
    DashboardComponent,
    AddemployeeComponent,
    ViewemployeeComponent,
    UpdateemployeeComponent,
    ViewemployeedetailsComponent,
    InventoryComponent,
    SalesComponent,
    PurchaseComponent,
    ExpenseControlComponent,
    AddsupplierComponent,
    ViewsuppliersComponent,
    UpdatesupplierComponent,
    MessagesComponent,
    OrdersComponent,
    PurchaseorderComponent,
    RaisePOComponent,
    SalesorderComponent,
    DateRangeComponent,
    POSummaryComponent,
    InventorySummaryComponent,
    
  ],
  imports: [
    CommonModule,
   RetailerRoutingModule,
      MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonToggleModule,
    ChartModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatCardModule,
    
  ]
})
export class AdminModule { }
