import { Component, Inject } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LoginService } from "src/app/service/login.service";
import { StorageService } from "src/app/service/storage.service";
import { ForgotPasswordComponent } from "../../forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "../../change-password/change-password.component";

@Component({
  selector: "app-login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.css"],
})
export class LoginDialogComponent {
  form!: FormGroup;
  loading = false;
  rolecount: any;
  roleList: any;
  roleDetails: any;
  loginService: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private loginservice: LoginService,
    private localstorage: StorageService
  ) {
    this.form = this.formBuilder.group({
      emailId: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^([0|+[0-9]{1,5})?([6-9][0-9]{9})|([A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3})$"
        ),
      ]),
      password: new FormControl("", Validators.required),
    });
  }
  forgotPassword() {
    this.dialog.open(ForgotPasswordComponent);
  }
  close() {
    this.dialogRef.close();
  }
  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }

  login() {
    // if (this.form.invalid) {
    //   return;
    // }
    // this.loading = true;
    // this.loginService.postLoginData(AppSettings.AUTH_ENDPOINT + 'login',this.form.value)
    //   .subscribe(response => {
    //     this.storageService.setItem('user',response);
    //     this.dialogRef.close(this.form.value);
    //     console.log(this.storageService.getItem('user').data.id);
    //     localStorage.setItem('selectedProfileId', this.storageService.getItem('user').data.id);
    //     // this.router.navigate([this.storageService.getItem('user').data.roleDomain.path]);
    //    this.roleLogin();
    // });
    this.loginservice.login(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
        // console.log(res.data.accessToken);
        console.log(res.data.roleDomain.roleName);
        this.localstorage.setRoles(res.data.roleDomain.roleName);
        this.localstorage.setToken(res.data.accessToken);
        this.localstorage.setdata(res.data);
        console.log(
          " access token in  local storage  : " + this.localstorage.getToken()
        );
        console.log(
          " role name in  local storage  : " + this.localstorage.getRoles()
        );
        const rolename = res.data.roleDomain.roleName;
        if (
          rolename === "retailer" ||
          rolename === "Retailer_Owner" ||
          rolename === "Retailer_Manager" ||
          rolename === "Retailer_Lead" ||
          rolename === "Retailer_Executive"
        ) {
          this.router.navigate(["/admin"]);
          this.close();
        }
      },
      error: (error) => {
        alert("User not found !!!");
      },
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}
