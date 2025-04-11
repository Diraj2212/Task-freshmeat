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
  selector: 'app-updateemployee',
  templateUrl: './updateemployee.component.html',
  styleUrls: ['./updateemployee.component.css']
})
export class UpdateemployeeComponent {
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
    this.countryid
    this.getcountries();
    this.getbanks();
    this.getroles();
    this.getstateListByCountryId();
    this.getcityListByStateId();
    this.getstores();

    this.approve = false;
  }
}
  private getcountries() {
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
  }

  displayStateBasedOnCountryChange() {
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
  }
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  UpdateEmployee = this.builder.group({
    basicInfoForm : this.builder.group({    
      id: new FormControl({value:'',  disabled: true}),
      roleId: new FormControl('', Validators.required),
      storeId: new FormControl({value:'',  disabled: true}),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      dateOfBirth: new FormControl('', Validators.required,),
      genderId: new FormControl('', Validators.required),
      address1: new FormControl(''),
      countryId: new FormControl('', Validators.required),
      stateId: new FormControl('', Validators.required),
      cityId: new FormControl('', Validators.required),
      doorNumber: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      pinCode: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^([+][9][1]|[9][1]|[0]){0,1}([4-9]{1})([0-9]{9})$')]),
      alternativeNumber: new FormControl('', [Validators.pattern('^([+][9][1]|[9][1]|[0]){0,1}([4-9]{1})([0-9]{9})$')]),
      aadharNumber: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
      password: new FormControl('', ),
      confirmPassword: new FormControl(''),
      

    }),

     bankInfoForm: this.builder.group({
      adminBankId: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
      ifscCode: new FormControl('', Validators.required),
      branchName: new FormControl('', Validators.required),
      panNumber: new FormControl('', Validators.required)
    }),
     upload: this.builder.group({
      certificate: new FormControl('', Validators.required),
      terms: new FormControl('', Validators.required),

 
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

  submit() {
    //this.submit= true;
    console.log("in the submit method");
    console.log(this.user);

    if (this.bankInfoForm.valid && this.basicInfoForm.valid ) {

      this.api.updateEmployeeById(this.user)
        .subscribe(response => {
          alert('updated  successfully')
          this.router.navigate(['./viewemployee']);
        }

        );
    }
    else{
      console.log("form invalid")
    }
  }

}
