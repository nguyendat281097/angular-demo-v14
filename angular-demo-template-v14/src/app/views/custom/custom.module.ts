import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomRoutingModule } from './custom-routing.module';
import { BadgeModule, CardModule, GridModule, ButtonModule, FormModule } from '@coreui/angular';

import { SubCustomComponent } from './sub-custom/sub-custom.component';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { LoginComponent } from './login/login.component';
import { IconModule } from '@coreui/icons-angular';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './login/register/register.component';


@NgModule({
  declarations: [SubCustomComponent, LoginComponent, RegisterComponent],
  imports: [
    FormsModule,
    CommonModule,
    CustomRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule,

    ButtonModule,
    IconModule,
    FormModule,
    ReactiveFormsModule
  ]
})
export class CustomModule { }
