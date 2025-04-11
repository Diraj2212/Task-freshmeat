export class OrderDetailsDomain{

    categoriesTypeId!: string;
    categoriesId!: string;
    subCategoriesId!:string;
    productId!:string;
    productName!:string;
    quantity!:number;
    quality:any;
      unitPrice!:number;
    discount!:number;
    discountedPrice!:number;
    totalPrice!:number;

    constructor(categoriesTypeId:string, categoryid:string, subcategoryId:string, productId:string,productName:string,
        quantity:number,quality:any,unitprice:number,discountnumber:number,discountedprice:number, totalprice:number
    ){

        this.categoriesTypeId = categoriesTypeId;
        this.categoriesId = categoryid;
        this.subCategoriesId = subcategoryId;
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.quality=quality;
        this.unitPrice = unitprice;
        this.discount = discountnumber;
        this.discountedPrice=discountedprice;
        this.totalPrice = totalprice;

    }
}