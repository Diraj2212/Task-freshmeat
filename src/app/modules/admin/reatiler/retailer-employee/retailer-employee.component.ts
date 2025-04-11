import { Component, OnInit} from '@angular/core';
import { RetailerEmployeeservice } from 'src/app/service/RetailerEmployeeservice';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { RetailerEmployee } from 'src/app/service/RetailerEmployee';
import { RetailerEmployeeUpdateStatusComponent } from './retailer-employee-update-status/retailer-employee-update-status.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-retailer-employee',
  templateUrl: './retailer-employee.component.html',
  styleUrls: ['./retailer-employee.component.css']
  
}) 
export class RetailerEmployeeComponent implements OnInit{
  employeeStatus: any;
  selectedretailer:any;
  retailerslist:any;
  retaileremployee:RetailerEmployee[]=[];
  ActiveEmployee:RetailerEmployee[]=[];
  InactiveEmployee:RetailerEmployee[]=[];
  retailervalue:any;
  AllRetailers:RetailerEmployee[]=[];
  retailer:any;
  constructor(private http:RetailerEmployeeservice,private dialog:MatDialog){}

  ngOnInit(): void {
    this.http.getretailer().subscribe (res=>{

      res.forEach((val)=>{

        this.retailer.push(val);
      })
        console.log(this.retailer)
      
      })


      

    
    
  }
  
    retailerChange(event:Event){
    
      
        this.http.getlistofEmployee(this.selectedretailer ).subscribe(res=>{
          this.retailervalue=res;
          this.AllRetailers=this.retailervalue.data;
          this.ActiveEmployee.splice(0,this.ActiveEmployee.length)
          this.InactiveEmployee.splice(0,this.InactiveEmployee.length)
          this.AllRetailers.forEach(data=>{

          if(data.status==true){
            this.ActiveEmployee.push(data)
          }
          else{
            data.status=false;
            this.InactiveEmployee.push(data)
          }})

       
        })
       }
       updateEmployeeStatus(id:any,status:any){
        const deleteEmp=this.dialog.open(RetailerEmployeeUpdateStatusComponent,{
          data:{
            id,status,
          }
        } )
       }
      }
      
