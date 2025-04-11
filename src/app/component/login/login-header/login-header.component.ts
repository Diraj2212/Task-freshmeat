import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';


@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent {
  form !: FormGroup;
  loading = false;
  rolecount:any;
  roleList:any;
  roleDetails:any;
  loginService: any;

  constructor(public dialog: MatDialog){
  }
  openlogindialog(){
    this.dialog.open(LoginDialogComponent,{width:'30%'})
    }

}
