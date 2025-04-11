import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddemployeeComponent } from "./employee/addemployee/addemployee.component";
import { ViewemployeeComponent } from "./employee/viewemployee/viewemployee.component";
import { ViewemployeedetailsComponent } from "src/app/modules/admin/employee/viewemployeedetails/viewemployeedetails.component";
import { InventoryComponent } from "./reports/inventory/inventory.component";
import { ExpenseControlComponent } from "./reports/expense-control/expense-control.component";
import { PurchaseComponent } from "./reports/purchase/purchase.component";
import { SalesComponent } from "./reports/sales/sales.component";
import { OrdersComponent } from "./orders/orders.component";
import { MessagesComponent } from "./messages/messages.component";
import { SalesorderComponent } from "./orders/salesorder/salesorder.component";
import { InventorySummaryComponent } from "./reports/inventory/inventory-summary/inventory-summary.component";
import { LogoutComponent } from "./logout/logout.component";
import { PurchaseorderComponent } from "./orders/purchaseorder/purchaseorder.component";
import { RaisePOComponent } from "./orders/raisePo/raisepo.component";
import { POSummaryComponent } from "./orders/posummary/posummary.component";

const routes: Routes = [

  {
    
    path: "",
    component: NavBarComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "logout",
        component: LogoutComponent,
      },
      {
        path: "inventory",
        component: InventoryComponent,
      },
      {
        path: "InventorySummary",
        component: InventorySummaryComponent,
      },
      {
        path: "addemployee",
        component: AddemployeeComponent,
      },
      {
        path: "expense-control",
        component: ExpenseControlComponent,
      },
      {
        path: "purchase",
        component: PurchaseComponent,
      },

      {
        path: "sales",
        component: SalesComponent,
      },
      {
        path: "viewemployee",
        component: ViewemployeeComponent,
      },
      {
        path: "viewemployeedetails",
        component: ViewemployeedetailsComponent,
      },

      {
        path: "orders",
        component: OrdersComponent,
      }, {
        path: "purchaseorder",
        component: PurchaseorderComponent,
      },
      {
        path: "salesorder",
        component: SalesorderComponent,
      },
      {
        path: "messages",
        component: MessagesComponent,
      },
      { path: 'raisepo', component: RaisePOComponent },
      {path: 'POSummary/:orderId', component: POSummaryComponent},
    ],
    
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetailerRoutingModule {}
