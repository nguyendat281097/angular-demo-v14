import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private userService: UserService, private authService: AuthService,
    private cookieService: CookieService, private router: Router) {
    super();
  }
  logout() {
    console.log('logout');
    this.cookieService.delete('userInfo');
    this.cookieService.delete('token');
    this.authService.setLoggedIn(false);
    this.router.navigate(['/login']);
  }
}
