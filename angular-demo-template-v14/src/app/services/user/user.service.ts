import { Injectable } from '@angular/core';
import { ApiService } from './../api.service';
import { User } from '../../models/user';
import { RootObj } from '../../models/root-obj';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) { }
  login(userName: string, password: string) {
    const data = {
      userName: userName,
      password: password,
    };
    // return this.apiService.post<RootObj<User>>(this.apiService.apiUrl.users.login, data);
    return new Promise((resolve, reject) => {
      this.apiService.post<RootObj<User>>(this.apiService.apiUrl.users.login, data)
          .subscribe(
              response => resolve(response),
              err => reject(err)
          );
    });
  }

  register(userName: string, password: string, fullName: String) {
    // build request and send
    const data = {
      userName: userName,
      password: password,
      fullName: fullName,
    };

    return new Promise((resolve, reject) => {
      this.apiService.post<RootObj<User>>(this.apiService.apiUrl.users.register, data)
          .subscribe(
              response => resolve(response),
              err => reject(err)
          );
  });
  }
}
