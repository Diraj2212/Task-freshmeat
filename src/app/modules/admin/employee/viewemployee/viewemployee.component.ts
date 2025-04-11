
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ViewemployeeService } from 'src/app/service/viewemployee.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppSetting } from 'src/app/constant/constant';
import { MatTableDataSource } from '@angular/material/table';
import { user } from '../../models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdateemployeeComponent } from '../updateemployee/updateemployee.component';
import { StorageService } from 'src/app/service/storage.service';
import {ViewemployeedetailsComponent} from 'src/app/modules/admin/employee/viewemployeedetails/viewemployeedetails.component';
@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css']
})
export class ViewemployeeComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  stores: any;
  roles: any;
  list: any;
  tab: any;
  storeId : any;


  //userList !: user[] = [];
//dataSource !: MatTableDataSource<user>;
  dataSource: any;
//  displayedColumns: string[] = ["id", "firstName", "lastName", "roleDomain.roleName", "action"];
  displayedColumns: string[] = ["id", "firstName", "lastName", "roleDomain.roleName","action"];

  constructor(private builder: FormBuilder, private router: Router, private api: ViewemployeeService, private service:StorageService, private dialog:MatDialog) {

  }
  
  dropdownForm = this.builder.group({
    roleId: new FormControl('', Validators.required),
    storeId: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.displayStoreBasedOnRoleChange()
    //this.getroles();
    this.displayEmployeesbasedOnStoreId(this.service.getdata().storeId);
    this.tabClick(0);
    

    
  }

  updatePopup(id:any){
    this.dialog.open(UpdateemployeeComponent,{
      width: "1200px",
      exitAnimationDuration:"1000ms",
      enterAnimationDuration:"1000ms",
      data:{
        id:id
      }

    })

  }
  viewDetailsPopup(id:any){
    this.dialog.open(ViewemployeedetailsComponent,{
      width: "1200px",
      exitAnimationDuration:"1000ms",
      enterAnimationDuration:"1000ms",
      data:{
        id:id
      }

    })

  }
  closePopup(){
    this.dialog.closeAll();
  }

  displayStoreBasedOnRoleChange() {
    console.log(this.service.getdata().storeId)
    this.storeId = this.service.getdata().storeId;
  } 
  displayEmployeesbasedOnStoreId(active: any){
        console.log("in the get employees")
        console.log(active)
        console.log("role name : " + this.service.getRoles())
    let storeId = this.service.getdata().storeId;
    console.log("storeId : " + storeId)
    this.api.getEmployees(AppSetting.AUTH_ENDPOINT + 'getUsersByStoreId/' + storeId +'/' + active )
    .subscribe(response => {
      console.log(response);
     // this.list=response;
      this.list = { ...response };
      //console.log(this.list);
      this.list = this.list.data;
      //console.log(this.list);
      this.dataSource = new MatTableDataSource<user>(this.list);
     //console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
      });
  }

  private getroles() {
    this.api.getRoles(AppSetting.AUTH_ENDPOINT + 'roleList')
      .subscribe(response => {
        this.roles = { ...response };
        this.roles = this.roles.data;
      });
  }

  Filterchange(event:Event){
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

  }
   employeeEdit(id:any) {
    this.updatePopup(id);
    //this.api.getEmployeeById(AppSetting.TIEUP_ENDPOINT + 'getUserInfoById/' + id)

  }
   employeeDelete(id:any) {
    if(confirm('Are you sure to delete the employee with id  : ' + id))
     this.api.deleteEmployee(AppSetting.AUTH_ENDPOINT + 'deleteUser/' + id)
    .subscribe( response=> {
      alert('deleted successfully')
    this.router.navigate(['/viewemployee'])
      
    }) 

  }
   employeeView(id:any) {
    this.viewDetailsPopup(id);

  }
  tabClick(tab: any) {
     let active = true;
    
    if (tab.index == 0){
      
      active = true;
    }
    else if(tab.index == 1) {
      console.log("value of tab" + tab)
      active  = false;
    }
    this.displayEmployeesbasedOnStoreId(active);
  }


}
