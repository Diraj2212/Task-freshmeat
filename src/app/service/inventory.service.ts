import { Injectable } from "@angular/core";
import { AppSetting } from "../constant/constant";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { map, Observable } from "rxjs";
import { StockModel } from "../modules/admin/models/StockModel";

@Injectable({
  providedIn: "root",
})
export class InventoryService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}
  private apiUrl = `${AppSetting.RETAILER_ENDPOINT}stock/last31daysstockfromcurrentdate/`;
  ViewInventoryDetails(
    createdDate: any,
    storeId: any,
    productId: any,
    categoryId: any
  ) {
    return this.http.get<any>(
      AppSetting.RETAILER_ENDPOINT +
        `/StockInfowithFMPriceAndFMDiscount/${storeId}/${createdDate}/${productId}/${categoryId}`
    );
  }

  // getStocklast31daysstockfromcurrentdate(
  //   warehouseId: string
  // ): Observable<StockModel[]> {
  //   // return this.http.get<StockModel[]>(`${this.apiUrl}/${warehouseId}`);
  //   return this.http.get<StockModel[]>(
  //     AppSetting.WAREHOUSE_ENDPOINT +
  //       `stock/last31daysstockfromcurrentdate/ ${warehouseId}`
  //   );
  // }
  getStocklast31daysstockfromcurrentdate(
    storeId: string
  ): Observable<StockModel[]> {
    // Correct URL construction without extra spaces
    const url = `${this.apiUrl}${storeId}`;
    console.log("Request URL:", url); // Log the request URL for debugging
    return this.http.get<{ status: string; data: StockModel[] }>(url).pipe(
      map((response) => {
        console.log("Response received:", response); // Log the full response for debugging
        return response.data; // Return only the data part of the response
      })
    );
  }
}
