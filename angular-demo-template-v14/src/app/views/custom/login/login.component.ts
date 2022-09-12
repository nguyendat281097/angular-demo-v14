import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  message: string = '';
  userName: string = '';
  password: string = '';
  constructor(private userService: UserService, private router: Router, private authService: AuthService,
     private cookieService: CookieService) {}
  login() {
    // validate at here
    if(this.userName && this.password) {
      this.userService.login(this.userName, this.password).then( (res : any) => {
        if (res.errorCode === 0) {
          this.message = '';
          // save user info, then redirect to dashboard
          this.cookieService.set('userInfo', JSON.stringify(res.data));
          this.cookieService.set('token', res.data.token);
          this.authService.setLoggedIn(true);
          this.router.navigate(['/dashboard']);
        } else {
          this.message = res.message;
        }
      }).catch((res: any) => {
        // I would first examine the error response
        this.message = res.error.message;
    });
    } else {
      this.message = 'Username and password are required!';
    }
  }
}
