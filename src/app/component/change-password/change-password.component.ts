import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "src/app/service/login.service";
import { MatFormFieldModule, MatSuffix } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatDialog, MatDialogClose } from "@angular/material/dialog";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatCardSubtitle } from "@angular/material/card";
import { NgIf } from "@angular/common";
@Component({
  selector: "app-change-password",
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatInput,
    MatButton,
    MatButtonModule,
    MatDialogClose,
    MatSuffix,
    MatIconModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: "./change-password.component.html",
  styleUrl: "./change-password.component.css",
})
export class ChangePasswordComponent implements OnInit {
  changeform!: FormGroup;
  fb = inject(FormBuilder);

  hidePassword: boolean = false;
  hidePassword1: boolean = false;
  hidePassword2: boolean = false;
  user!: {
    emailId: any;
    confirmPassword: any;
    ForgotPassword: undefined;
    newPassword: any;
    password: undefined;
    otp: undefined;
  };
  constructor(private http: LoginService) {}

  ngOnInit(): void {
    this.changeform = this.fb.group({
      password: [
        "",
        Validators.compose([Validators.required, Validators.required]),
      ],
      email: [
        "",
        Validators.compose([Validators.required, Validators.required]),
      ],
      newPassword: [
        "",
        Validators.compose([Validators.required, Validators.required]),
      ],
      confirmPassword: [
        "",
        Validators.compose([Validators.required, Validators.required]),
      ],
    });
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  changePassword() {
    this.user = {
      emailId: this.changeform.get("email")?.value,
      confirmPassword: this.changeform.get("confirmPassword")?.value,
      ForgotPassword: undefined,
      newPassword: this.changeform.get("newPassword")?.value,
      password: this.changeform.get("password")?.value,
      otp: undefined,
    };
    this.http.changePassword(this.user).subscribe((res: any) => {
      console.log(this.user);
      if (res.status == "SUCCESS") {
        alert("Password Changed Succesfully");
      } else {
        alert("Try again");
      }
    });
  }
}
