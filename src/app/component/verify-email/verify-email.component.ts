import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { LoginService } from "src/app/service/login.service";
import { ResetPasswordComponent } from "../reset-password/reset-password.component";
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgModel,
  ReactiveFormsModule,
  FormsModule,
} from "@angular/forms";

@Component({
  selector: "app-verify-email",
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: "./verify-email.component.html",
  styleUrl: "./verify-email.component.css",
})
export class VerifyEmailComponent implements OnInit {
  email: any;
  otp: any;
  maxlength: number = 1;
  p1: any;
  p2: any;
  p3: any;
  p4: any;
  p5: any;
  p6: any;

  constructor(
    private http: LoginService,
    public dialogRef: MatDialogRef<VerifyEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.email = this.data.email;
  }

  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxLength = c.getAttribute("maxLength");
    if (length == maxLength) {
      if (n != "") {
        n.focus();
      }
    }
    if (e.key === "Backspace") {
      if (p != "") {
        p.focus();
      }
    }
    console.log(this.p1, this.p2, this.p3, this.p4, this.p5, this.p6);
  }
  verifyOTP() {
    this.otp = this.p1 + this.p2 + this.p3 + this.p4 + this.p5 + this.p6;
    this.http.verifyemail(this.email, this.otp).subscribe((res: any) => {
      if (res.status == "SUCCESS") {
        alert("Email Verified Succesfully");
        this.dialog.open(
          ResetPasswordComponent,

          { data: { email: this.email, width: "25%" } }
        );
      } else {
        alert("Wrong credentials");
      }
    });
  }
}
