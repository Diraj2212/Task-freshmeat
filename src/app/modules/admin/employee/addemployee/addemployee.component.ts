
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AppSetting } from 'src/app/constant/constant';
import {AddemployeeService } from 'src/app/service/addemployee.service';
import { user } from '../../models/user';
import { addressModel } from '../../models/addressModel';
import { bankModel } from '../../models/bankModel';
//import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StorageService } from 'src/app/service/storage.service';




@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
  
    providers: [
      
    ]
    })
  
  
export class AddemployeeComponent {

  @ViewChild('tabs') tabs!: MatTabGroup;
  hide = true;
  
  public approve: boolean = false;
  //registerForm !: FormGroup;
 // bankForm !: FormGroup;
 // uploadform!:FormGroup;
  maxDate!: Date;
  countries: any;
  states: any;
  stores:any;
  cities: any;
  roles: any;
  banks: any;
  countryid : any;
  user: user = new user();
  addressModel: addressModel = new addressModel();
  bankModel: bankModel = new bankModel();
  selectedDate: any;
  dateOfBirth :  any;
  isLinear = true;
  storeId:any;
  
 

  constructor(private builder: FormBuilder, private router: Router,private api:AddemployeeService, private service : StorageService) {
      
   }


  
  ngOnInit(): void {
    this.countryid
    this.getcountries();
 this.getbanks();
 this.getroles();
 this.getstateListByCountryId();
 this.getcityListByStateId();
 this.getstores();
 
 
 this.approve = false;
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
    console.log(this.service.getdata().storeId)
    this.storeId = this.service.getdata().storeId;
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
    console.log("countryid : "+ this.countryid)
    this.api.getstatesByCountryId(AppSetting.ADMIN_ENDPOINT + 'stateList/'  + this.basicInfoForm.controls['countryId'].value)
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
  
   
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
    }
  }
  AddEmployee = this.builder.group({
    basicInfoForm : this.builder.group({
      
    roleId: new FormControl('', Validators.required),
    storeId: this.service.getdata().storeId,
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl('', Validators.required, ),
    gender: new FormControl('', Validators.required),
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
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl(''),

  }),

  bankInfoForm : this.builder.group({
    adminBankId: new FormControl('', Validators.required),
    accountNumber: new FormControl('', Validators.required),
    ifscCode: new FormControl('', Validators.required),
    branchName: new FormControl('', Validators.required),
    panNumber: new FormControl('', Validators.required)
  }),
  upload:this.builder.group({
    //certificate: new FormControl('', Validators.required),
    terms:  new FormControl('', Validators.required),
    

  }), 

})

get basicInfoForm(){
  return this.AddEmployee.get("basicInfoForm") as FormGroup;
}
get bankInfoForm(){
  return this.AddEmployee.get("bankInfoForm") as FormGroup;
}
  get uploadForm(){
  return this.AddEmployee.get("upload") as FormGroup;
} 
    


  submit() {
    //this.submit= true;
    console.log("in the submit method");
          console.log(this.user);  
      
    if (this.bankInfoForm.valid && this.basicInfoForm.valid ) {
                  
      this.api.createUser(this.user)
          .subscribe(response => {
          alert('submit successfully')
          this.router.navigate(['/viewemployee']);
        }
        
        );
}
}

}
