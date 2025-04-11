import { Component, OnInit, inject } from "@angular/core";
import { MatDialog, MatDialogClose } from "@angular/material/dialog";
import { MatFormFieldModule, MatSuffix } from "@angular/material/form-field";
import { LoginService } from "src/app/service/login.service";
import { VerifyEmailComponent } from "../verify-email/verify-email.component";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButton,
    MatButton,
    MatDialogClose,
    MatInput,
    MatSuffix,
    MatInputModule,
    MatIconModule,
    NgIf,
  ],

  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.css",
})
export class ForgotPasswordComponent implements OnInit {
  [x: string]: any;

  forgotform!: FormGroup;

  email: any;
  constructor(
    private http: LoginService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.forgotform = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
    });
  }
  generateOtp() {
    this.email = this.forgotform.get("email")?.value;

    this.http.findUserByEmailId(this.email).subscribe((res: any) => {
      console.log(this.email);
      console.log(res.data);
      if (res.data == true) {
        this.http.generateOtp(this.email).subscribe((res: any) => {});
        this.dialog.open(VerifyEmailComponent, {
          data: { email: this.email },
        });
      } else {
        alert("user with email " + this.email + " not found");
      }
    });
  }
}
