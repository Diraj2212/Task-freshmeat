import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RetailerEmployeeservice } from 'src/app/service/RetailerEmployeeservice';

@Component({
  selector: 'app-retailer-employee-update-status',
  templateUrl: './retailer-employee-update-status.component.html',
  styleUrls: ['./retailer-employee-update-status.component.css']
})
export class RetailerEmployeeUpdateStatusComponent {

  constructor(private matDiaolg:MatDialogRef<RetailerEmployeeUpdateStatusComponent>,private http:RetailerEmployeeservice,@Inject(MAT_DIALOG_DATA) public data: any){

  }
  id:any;
  status:any;
  ngOnInit(): void {
    this.id=this.data.id;
    this.status=this.data.status;
   

  }

  changeEmployeeStatus(){  
    this.matDiaolg.close();
      this.http.changeEmployeeStatus(this.id,!this.status).subscribe(res=>{
              
       
      })
      

  }
}
