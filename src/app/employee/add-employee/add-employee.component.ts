import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEmployeeModel } from '../models/create-employee-model';
import { GetDepartmentsModel } from '../models/get-departments-model';
import { DepartmentService } from '../services/department.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  departments: GetDepartmentsModel[] | undefined;
  addEmployeeForm: FormGroup | undefined;
  submitted = false;
  date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getDepartments();
    this.initializeForm();
  }

  getDepartments() {
    this.departmentService.get().subscribe({
      next: (result) => {
        this.departments = result;
      },
      error: (err) => {
        console.log(err);
        alert('Some error occured. Please try again.');
      },
    });
  }

  initializeForm() {
    this.addEmployeeForm = this.formBuilder.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      department: ['', [Validators.required]],
    });
  }

  get f() {
    return this.addEmployeeForm?.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addEmployeeForm?.invalid) {
      return;
    }

    const newEmployee = {
      title: this.addEmployeeForm?.get('title')?.value,
      name: this.addEmployeeForm?.get('name')?.value,
      email: this.addEmployeeForm?.get('email')?.value,
      dob: this.addEmployeeForm?.get('dob')?.value,
      departmentId: parseInt(this.addEmployeeForm?.get('department')?.value),
    } as CreateEmployeeModel;

    this.employeeService.create(newEmployee).subscribe({
      next: (result) => {
        if (result)
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      },
      error: (err) => {
        console.log(err);
        alert('Some error occured. Please try again.');
      },
    });
  }
}
