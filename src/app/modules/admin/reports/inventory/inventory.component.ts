import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { MatDatepicker } from "@angular/material/datepicker";
import { inventory } from "../../models/inventory";
import { InventoryService } from "src/app/service/inventory.service";
import { StockModel } from "../../models/StockModel";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.css"],
  providers: [DatePipe],
})
export class InventoryComponent implements OnInit {
  storeId: string = ""; // Stores the entered Store ID
  stocks: any[] = []; // Stores the fetched stocks data
  displayedColumns: string[] = [
    "productId",
    "productName",
    "availableQuantity",
    "quality",
    "expiryDate",
    "action",
  ]; // Defines the columns to be displayed in the table
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); // Data source for the table

  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild to access paginator

  constructor(private stockService: InventoryService) {} // Inject your StockService

  ngOnInit(): void {
    // Initialization logic can go here
  }

  fetchStocks(): void {
    if (this.storeId) {
      const storeIdPattern = /^R-\d{5}$/; // Pattern to match WH- followed by 5 digits
      if (!storeIdPattern.test(this.storeId)) {
        alert(
          "Invalid storeId format. Please enter a valid ID (e.g., R-00001)."
        );
        this.storeId = ""; // Clear the input field
        return;
      }

      console.log("Fetching stocks for storeId:", this.storeId); // Log storeId
      this.stockService
        .getStocklast31daysstockfromcurrentdate(this.storeId)
        .subscribe(
          (data) => {
            console.log("Data received:", data); // Log data received
            if (data && data.length > 0) {
              this.stocks = data;
              this.dataSource.data = this.stocks;
            } else {
              this.stocks = []; // Set an empty array
              this.dataSource.data = this.stocks;
              console.warn("No stock data available.");
              alert("No stock data available for the selected retailer.");
              this.storeId = ""; // Clear the input field
            }
          },
          (error) => {
            console.error("Error fetching stock data:", error);
            alert(
              "An error occurred while fetching stock data. Please try again later."
            );
            this.storeId = ""; // Clear the input field in case of error
          }
        );
    }
  }

  viewStock(stock: any) {
    // Handle view action
    console.log("View stock:", stock);
  }

  deleteStock(stock: any) {
    // Handle delete action
    console.log("Delete stock:", stock);
  }
  editStock(stock: any) {
    console.log("Edit stock:", stock);
  }
}
