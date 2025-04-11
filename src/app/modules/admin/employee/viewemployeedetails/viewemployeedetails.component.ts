import { Component, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';
import { user } from '../../models/user';
import { addressModel } from '../../models/addressModel';
import { bankModel } from '../../models/bankModel';
import { AppSetting } from 'src/app/constant/constant';
import { AddemployeeService } from 'src/app/service/addemployee.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-viewemployeedetails',
  templateUrl: './viewemployeedetails.component.html',
  styleUrls: ['./viewemployeedetails.component.css']
})
export class ViewemployeedetailsComponent {
  @ViewChild('tabs') tabs!: MatTabGroup;
  hide = true;
  
  public approve: boolean = false;

  maxDate!: Date;
  countries: any;
  states: any;
  stores: any;
  cities: any;
  roles: any;
  banks: any;
  countryid: any;
  user: user = new user();
  addressModel: addressModel = new addressModel();
  bankModel: bankModel = new bankModel();
  selectedDate: any;
  dateOfBirth: any;
  isLinear = true;
  editdata:any;



  constructor(private builder: FormBuilder, private router: Router, private api: AddemployeeService, private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any) {

  }
  ngOnInit(): void {
   if( this.data.id !='' && this.data.id !=null){
    this.api.getEmployeeById(this.data.id).subscribe(response =>{
      console.log(response)
      //console.log(" genger ID : " + this.editdata.genderId)
      this.editdata = response;
      this.editdata = this.editdata.data
      console.log("this is edit data : " + this.editdata.genderId)
      this.UpdateEmployee.setValue({basicInfoForm:{
        id:this.editdata.id, 
        roleId:this.editdata.roleId,
        storeId:this.editdata.storeId,
        firstName:this.editdata.firstName,
        lastName:this.editdata.lastName,
        dateOfBirth:this.editdata.dob,
        genderId:this.editdata.genderId,
        address1:this.editdata.address1,
        countryId:this.editdata.countryId,
        stateId:this.editdata.stateId,
        cityId:this.editdata.cityId,
        doorNumber:this.editdata.doorNumber,
        street:this.editdata.street,
        pinCode:this.editdata.pinCode,
        mobileNumber:this.editdata.mobileNumber,
        alternativeNumber:this.editdata.alternativeNumber,
        aadharNumber:this.editdata.aadharNumber,
        emailId:this.editdata.emailId,
        password:this.editdata.password,
        confirmPassword:this.editdata.confirmPassword},
        bankInfoForm:{
        adminBankId:this.editdata.bankDomainV1.adminBankId,
        accountNumber:this.editdata.accountNumber,
        ifscCode:this.editdata.ifscCode,
        branchName:this.editdata.branchName,
        panNumber:this.editdata.panNumber},
        upload:{
          certificate:null,
            terms:null,

        }
    });

   })
    /* this.countryid
    this.getcountries();
    this.getbanks();
    this.getroles();
    this.getstateListByCountryId();
    this.getcityListByStateId();
    this.getstores(); */

    this.approve = false;
  }
}
  /* private getcountries() {
    this.api.getCountries(AppSetting.ADMIN_ENDPOINT + 'countryList')
      .subscribe(response => {
        this.countries = { ...response };
        this.countries = this.countries.data;
      });
  }
  displayStoreBasedOnRoleChange() {
    console.log("in the display of store moethod after change")
    this.getstores();
  }
  private getstores() {
    console.log("in the get stores")
    console.log("in the get stores role Id : " + this.basicInfoForm.controls['roleId'].value)
    this.api.getStores(AppSetting.TIEUP_ENDPOINT + 'storeList/' + this.basicInfoForm.controls['roleId'].value)
      .subscribe(response => {
        this.stores = { ...response };
        this.stores = this.stores.data;
      });
  } */

  /* displayStateBasedOnCountryChange() {
    console.log("inthe display of sate moethod")
    this.getstateListByCountryId();
  }
  displayCityBasedOnStateChange() {
    this.getcityListByStateId();
  }
  private getstateListByCountryId() {
    this.countryid = this.basicInfoForm.controls['countryId'].value
    console.log("countryid : " + this.countryid)
    this.api.getstatesByCountryId(AppSetting.ADMIN_ENDPOINT + 'stateList/' + this.basicInfoForm.controls['countryId'].value)
      .subscribe(response => {
        this.states = { ...response };
        this.states = this.states.data;
      });
  }
  private getcityListByStateId() {
    this.api.getcitiesByStateId(AppSetting.ADMIN_ENDPOINT + 'cityList' + '/' + this.basicInfoForm.controls['stateId'].value)
      .subscribe(response => {
        this.cities = { ...response };
        this.cities = this.cities.data;
      });
  }
  private getbanks() {
    this.api.getBanks(AppSetting.ADMIN_ENDPOINT + 'bankList')
      .subscribe(response => {
        this.banks = { ...response };
        this.banks = this.banks.data;
      });
  }
  private getroles() {
    this.api.getRoles(AppSetting.AUTH_ENDPOINT + 'roleList')
      .subscribe(response => {
        this.roles = { ...response };
        this.roles = this.roles.data;
      });
  } */
  
  UpdateEmployee = this.builder.group({
    basicInfoForm : this.builder.group({    
      id: new FormControl({value:'',  disabled: true}),
      roleId: new FormControl({value:'',  disabled: true}),
      storeId: new FormControl({value:'',  disabled: true}),
      firstName: new FormControl({value:'',  disabled: true}),
      lastName: new FormControl({value:'',  disabled: true}),
      dateOfBirth: new FormControl({value:'',  disabled: true}),
      genderId: new FormControl({value:'',  disabled: true}),
      address1: new FormControl({value:'',  disabled: true}),
      countryId: new FormControl({value:'',  disabled: true}),
      stateId: new FormControl({value:'',  disabled: true}),
      cityId: new FormControl({value:'',  disabled: true}),
      doorNumber: new FormControl({value:'',  disabled: true}),
      street: new FormControl({value:'',  disabled: true}),
      pinCode: new FormControl({value:'',  disabled: true}),
      mobileNumber: new FormControl({value:'',  disabled: true}),
      alternativeNumber: new FormControl({value:'',  disabled: true}),
      aadharNumber: new FormControl({value:'',  disabled: true}),
      emailId: new FormControl({value:'',  disabled: true}),
      password: new FormControl({value:'',  disabled: true}),
      confirmPassword: new FormControl({value:'',  disabled: true}),
      

    }),

     bankInfoForm: this.builder.group({
      adminBankId: new FormControl({value:'',  disabled: true}),
      accountNumber: new FormControl({value:'',  disabled: true}),
      ifscCode: new FormControl({value:'',  disabled: true}),
      branchName: new FormControl({value:'',  disabled: true}),
      panNumber: new FormControl({value:'',  disabled: true})
    }),
     upload: this.builder.group({
      certificate: new FormControl({value:'',  disabled: true}),
      terms: new FormControl({value:'',  disabled: true}),

 
    }),

  })
  
  get basicInfoForm() {
    return this.UpdateEmployee.get("basicInfoForm") as FormGroup;
  }
  get bankInfoForm() {
    return this.UpdateEmployee.get("bankInfoForm") as FormGroup;
  }
 get uploadForm() {
    return this.UpdateEmployee.get("upload") as FormGroup;
  }

  closePopup(){
    this.dialog.closeAll();
  }

  
}



