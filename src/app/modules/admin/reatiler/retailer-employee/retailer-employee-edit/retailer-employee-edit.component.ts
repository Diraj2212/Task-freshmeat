import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppSetting } from 'src/app/constant/constant';
import { RetailerEmployeeservice } from 'src/app/service/RetailerEmployeeservice';
import { EmpregistationserviceService } from 'src/app/service/empregistationservice.service';

@Component({
  selector: 'app-retailer-employee-edit',
  templateUrl: './retailer-employee-edit.component.html',
  styleUrls: ['./retailer-employee-edit.component.css']
})
export class RetailerEmployeeEditComponent {

  constructor(private activatedRoute:ActivatedRoute,private http:RetailerEmployeeservice,private api:EmpregistationserviceService,private formBuilder:FormBuilder){}
   ngOnInit(): void {
    this.employeeId=this.activatedRoute.snapshot.paramMap.get('id');
   
    // this.getDetails(this.employeeId);
    this.getcountries();
    this.getDetails(this.employeeId);
    this.getbanks();
    this.getroles();
   
   // this.getstateListByCountryId();
   
    
    this.approve = false;
  }

  
  employeeId:any;
  data:any;
  //empDetails!: WareHouseEmployee;
  hide = true;
  public currentIndex = 0;
  public approve: boolean = false;
  registerForm=new FormGroup({
    roleId: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    address1: new FormControl(''),
    countryId: new FormControl(''),
    stateId: new FormControl(''),
    cityId: new FormControl(''),
    doorNumber: new FormControl(''),
    street: new FormControl(''),
    pinCode: new FormControl(''),
    mobileNumber: new FormControl(''),
    alternativeNumber: new FormControl(''),
    aadharNumber: new FormControl(''),
    emailId: new FormControl(''),
    adminBankId: new FormControl(''),
    accountNumber: new FormControl(''),
    ifscCode: new FormControl(''),
    branchName: new FormControl(''),
    panNumber: new FormControl(''),
    userId:new FormControl('')
    

  });

  
 
 
  maxDate!: Date;
  countries: any;
  states: any;
  cities: any;
  roles: any;
  banks: any;

  
  private getcountries() {
    this.api.getCountries(AppSetting.ADMIN_ENDPOINT + 'countryList')
      .subscribe(response => {
        this.countries = { ...response };
        this.countries = this.countries.data;
      });
  }

  
   getstateListByCountryId(countryId:any) {
    console.log(countryId,'ehckjerj');
    this.api.getstatesByCountryId(AppSetting.ADMIN_ENDPOINT + 'state/List' + '/' + countryId)
      .subscribe(response => {
        this.states = { ...response };
        this.states = this.states.data;
        console.log(this.states)
      });
     
  }
  getcityListByChangeStateId(){
    this.cities.splice(0,this.cities.length)
    this.getcityListByStateId(); 
  }

  private getcityListByStateId() {
    
    this.api.getcitiesByStateId(AppSetting.ADMIN_ENDPOINT + 'city/list' + '/' + this.registerForm.get('stateId')?.value)
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
  response:any;
  values:any;
  getDetails(id:any){

     this.http.getEmployeeDetailsById(id).subscribe((result)=>{
      
      this.response=result;
      this.values=this.response.data;
       
     this.registerForm = new FormGroup({
        roleId: new FormControl(this.values.roleId),
        firstName: new FormControl(this.values.firstName),
        lastName: new FormControl(this.values.lastName),
        dob: new FormControl(this.values.dob),
        gender: new FormControl(this.values.gender),
        address1: new FormControl(this.values.address1),
        countryId: new FormControl(this.values.countryId),
        stateId: new FormControl(this.values.stateId),
        cityId: new FormControl(this.values.cityId),
        doorNumber: new FormControl(this.values.doorNumber),
        street: new FormControl(this.values.street),
        pinCode: new FormControl(this.values.pinCode),
        mobileNumber: new FormControl(this.values.mobileNumber),
        alternativeNumber: new FormControl(this.values.alternativeNumber),
        aadharNumber: new FormControl(this.values.aadharNumber),
        emailId: new FormControl(this.values.emailId),
        adminBankId: new FormControl(this.values.bankDomainV1.adminBankId),
        accountNumber: new FormControl(this.values.accountNumber),
        ifscCode: new FormControl(this.values.ifscCode),
        branchName: new FormControl(this.values.branchName),
        panNumber: new FormControl(this.values.panNumber),
        userId:new FormControl(this.values.id)
    
      })
      this.getstateListByCountryId(this.registerForm.get('countryId')?.value);
      this.getcityListByStateId();

      console.log(this.registerForm.value);
     })
     

  }
  update(){
    
  }
}
