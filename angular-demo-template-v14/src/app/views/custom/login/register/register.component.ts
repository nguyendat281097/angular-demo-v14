import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  message: string = '';
  userName: string = '';
  password: string = '';
  rePassword: string = '';
  fullName: string = '';

  regForm!: FormGroup;

  constructor(private userService: UserService, private router: Router, private authService: AuthService,
    private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.regForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getFormValue() {
    this.userName = this.regForm.get('userName')?.value;
    this.fullName = this.regForm.get('fullName')?.value;
    this.password = this.regForm.get('password')?.value;
    this.rePassword = this.regForm.get('rePassword')?.value;
  }

  register() {
    console.log('register');
    if (this.regForm.valid) {
      this.getFormValue();
      this.userService.register(this.userName, this.password, this.fullName).then((res: any) => {

        if (res.errorCode === 0) {
          this.message = '';
          // save user info, then redirect to dashboard
          this.authService.setLoggedIn(true);
          this.message = res.message;
          this.router.navigate(['/login']);
        } else {
          this.message = res.message;
        }
      }).catch((res: any) => {
        // I would first examine the error response
        this.message = res.error.message;
      });
    } else {
      this.message = 'Some fields are not correctly, please update!';
    }
  }

}
