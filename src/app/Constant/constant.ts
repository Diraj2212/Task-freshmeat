// export class AppSetting{
//     public static ADMIN_ENDPOINT = 'http://localhost:8081/v1/';
//     public static AUTH_ENDPOINT = 'http://localhost:8082/v1/';
//     public static RETAILER_ENDPOINT = 'http://localhost:8084/v1/';
//     public static TIEUP_ENDPOINT = 'http://localhost:8085/v1/';
//    public static COLLECTION_CENTER_ENDPOINT = 'http://localhost:8086/v1/';
//    public static WAREHOUSE_ENDPOINT = 'http://localhost:8091/v1/';
//     static EMPLOYEE_ROLE_ID: number;
//     static PROFILE_SOURCE : 'APP';
// }

// // export class AppSetting{
// //     public static ADMIN_ENDPOINT = 'http://192.46.208.224:8081/v1/';
// //      public static AUTH_ENDPOINT = 'http://172.105.54.105:8082/v1/';
// // public static RETAILER_ENDPOINT = 'http://localhost:8084/v1/';
// //    public static TIEUP_ENDPOINT = 'http://localhost:8085/v1/';
// //    public static COLLECTION_CENTER_ENDPOINT = 'http://localhost:8086/v1/';
// // static EMPLOYEE_ROLE_ID: number;
// //  }

import { environment } from "src/environments/environment";

export class AppSetting {
  public static ADMIN_ENDPOINT = environment.ADMIN_ENDPOINT;
  public static AUTH_ENDPOINT = environment.AUTH_ENDPOINT;
  public static RETAILER_ENDPOINT = environment.RETAILER_ENDPOINT;
  public static TIEUP_ENDPOINT = environment.TIEUP_ENDPOINT;
  public static COLLECTION_CENTER_ENDPOINT =
    environment.COLLECTION_CENTER_ENDPOINT;
  public static WAREHOUSE_ENDPOINT = environment.WAREHOUSE_ENDPOINT;

  static EMPLOYEE_ROLE_ID: number;
  static PROFILE_SOURCE: "APP";
}
