import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './../custom/login/login.component';
import { CustomerTypeComponent } from './../custom/customer/customer-type/customer-type.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Custom'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'customer-type',
        component: CustomerTypeComponent,
        data: {
          title: 'Customer Type Page'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomRoutingModule { }
