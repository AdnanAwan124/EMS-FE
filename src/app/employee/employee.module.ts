import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeeListComponent,
  ],
  imports: [CommonModule, EmployeeRoutingModule, ReactiveFormsModule],
})
export class EmployeeModule {}
