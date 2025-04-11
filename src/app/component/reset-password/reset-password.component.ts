import { Component, Inject, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { userModel } from "src/app/service/UserService";
import { LoginService } from "src/app/service/login.service";
import { NgIf } from "@angular/common";

export const matchPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const newPassword = control.get("password");
  const confirmPassword = control.get("confirmPassword");

  if (
    !newPassword ||
    !confirmPassword ||
    newPassword.value === confirmPassword.value
  ) {
    return null;
  } else {
    return { passwordMismatch: true };
  }
};
@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    MatFormFieldModule,
    NgIf,
  ],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.css",
})
export class ResetPasswordComponent {
  user!: userModel;
  hide = true;
  resetform!: FormGroup;
  fb = inject(FormBuilder);
  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: LoginService
  ) {
    this.resetform = this.fb.group({
      newPassword: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            "/^(?=.[A-Z])(?=.d)(?=.[@$!%?&])[A-Za-zd@$!%*?&]{8,}$/"
          ),
        ]),
      ],
      confirmPassword: ["", Validators.compose([Validators.required])],

      validators: matchPassword, // Use the custom validator
    });
  }

  get password() {
    return this.resetform.get("password") || new FormControl();
  }
  resetPassword() {
    this.user = {
      emailId: this.data.email,
      confirmPassword: this.resetform.get("confirmPassword")?.value,
      ForgotPassword: undefined,
      newPassword: this.resetform.get("newPassword")?.value,
      password: undefined,
      otp: undefined,
    };
    console.log(this.user.newPassword);
    console.log(this.user.confirmPassword);
    console.log(this.user.emailId);

    this.http.resetPassword(this.user).subscribe((res: any) => {
      if (res.status == "SUCCESS") {
        alert("Password Changed Succesfully");
      } else {
        alert("Try Again");
      }
    });
  }
}

function ngOnInit() {
  throw new Error("Function not implemented.");
}
