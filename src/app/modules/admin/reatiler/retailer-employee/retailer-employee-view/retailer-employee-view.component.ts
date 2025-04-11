import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RetailerEmployeeDetailsList } from 'src/app/service/retailerEmployeeDetailsList'; 
import { RetailerEmployeeservice } from 'src/app/service/RetailerEmployeeservice';


@Component({
  selector: 'app-retailer-employee-view',
  templateUrl: './retailer-employee-view.component.html',
  styleUrls: ['./retailer-employee-view.component.css']
})
export class RetailerEmployeeViewComponent {
  constructor(private activatedRoute:ActivatedRoute,private http:RetailerEmployeeservice){}
 
  ngOnInit(): void {

    
   this.employeeId=this.activatedRoute.snapshot.paramMap.get('id');
   this.getDetails(this.employeeId);

  }
  employeeId:any;
  data:any;
  empDetails!: RetailerEmployeeDetailsList;

  getDetails(id:any){

     this.http.getEmployeeDetailsById(id).subscribe(res=>{
       this.data=res;
      this.empDetails=this.data.data;
      console.log(this.empDetails.id);
      


     })

  }

}