import { OrderDetailsDomain } from "./orderDetailsDomain";

export class Order {

  orderId:any;

 userId:any;
userRoleId:any;
retailerUserId:any;
retailerRoleId:any;
consumerId: any
consumerName: any;
consumerEmailId: any;
consumerMobileNumber: any;
consumerAddress: any;
	 warehouseId: any;
	 totalAmount: any;
	 orderType: any;
	paymentMode: any;
	paymentStatus: any;
	destination: any;
orderStatus: any
orderDetailsDomain !: OrderDetailsDomain[];


constructor ( userId:string, userRoleId:string,retailerUserId:string, retailerRoleId:string,
  retailerStoreId:string,retailerName:string,
  retailerEmail:string, retailerMobile:string, retailerAddress:string, wareHosueId:string,
  totalOrderAmnt:number,orderType:string,paymentMode:string, paymentStatus:string,
  destination:string,orderStatus:string,orderDetails:OrderDetailsDomain[]
){
  
  this.userId = userId;
  this.userRoleId = userRoleId;
  this.retailerUserId = retailerUserId;
  this.retailerRoleId = retailerRoleId;
  this.consumerId = retailerStoreId;
  this.consumerName = retailerName;
  this.consumerAddress = retailerAddress;
  this.warehouseId = wareHosueId;
  this.totalAmount = totalOrderAmnt;
  this.orderType = orderType;
  this.paymentMode= paymentMode;
  this.paymentStatus = paymentStatus;
  this.destination = destination;
  this.orderStatus = orderStatus;
  this.orderDetailsDomain = orderDetails;
}

}