//import { addressModel } from 'src/app/modules/admin/models/addressModel';
//import { bankModel } from 'src/app/modules/admin/models/bankModel';
import { AppSetting } from 'src/app/constant/constant';



export class user{  
  
    
        id:any
        alternativeNumber: any
        storeId: any
        confirmPassword: any
        emailId: any
        employeestatus!: true
        firstName: any
        lastName: any
        mobileNumber:any
        password: any
        profileSource= 'app';
        roleId!: 0
        employeeRoleId!:0
        status!: true
        tokenExpires: any
        warningMessage: any
        dob: any
        genderId: any
        aadharNumber: any
        accountNumber: any
       adminBankId: any
        branchName: any
       ifscCode: any
        panNumber: any
        roleDomain: roleDomain = new roleDomain;
        
               
        addressModel: AddressModel;
        constructor() {
        this.addressModel = new AddressModel();
        } 
    
    bankModel: BankModel[] = [new  BankModel()]
      }
      export class   AddressModel {

        doorNumber: any
        street: any
        address1: any
        address2: any
        cityId: any
        countryId: any
        pinCode: any
        stateId: any  
        status: any       
        
      }
      export class BankModel {
        accountNumber: any
       adminBankId: any
        branchName: any
       ifscCode: any
        panNumber: any
        status!: true
}
export class roleDomain {
  roleId: any
  roleName: any
  
}



