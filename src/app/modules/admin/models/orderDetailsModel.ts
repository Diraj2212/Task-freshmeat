export class OrderDetailsModel{

    categoriesTypeId!: string;
    categoriesId!: string;
    subCategoriesId!:string;
    productId!:string;
    productName!:string;
    quantity!:number;
      unitPrice!:number;
    discountnumber!:number;
    discountedPrice!:number;
    totalPrice!:number;

    constructor(categoriesTypeId:string, categoryid:string, subcategoryId:string, productId:string,productName:string,
        quantity:number,unitprice:number,discountnumber:number,discountedprice:number, totalprice:number
    ){

        this.categoriesTypeId = categoriesTypeId;
        this.categoriesId = categoryid;
        this.subCategoriesId = subcategoryId;
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.unitPrice = unitprice;
        this.discountnumber = discountnumber;
        this.discountedPrice=discountedprice;
        this.totalPrice = totalprice;

    }
}