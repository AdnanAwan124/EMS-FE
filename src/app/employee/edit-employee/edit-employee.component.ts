import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditEmployeeModel } from '../models/edit-employee-model';
import { GetDepartmentsModel } from '../models/get-departments-model';
import { DepartmentService } from '../services/department.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  departments: GetDepartmentsModel[] | undefined;
  employee: EditEmployeeModel | undefined;
  editEmployeeForm: FormGroup | undefined;
  submitted = false;
  date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getDepartments();
    this.getEmployee(parseInt(this.activatedRoute.snapshot.params['id']));
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

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe({
      next: (result) => {
        this.employee = result;
        console.log(this.employee);
        this.initializeForm();
      },
      error: (err) => {
        alert('Some error occured. Please try again.');
      },
    });
  }

  initializeForm() {
    this.editEmployeeForm = this.formBuilder.group({
      title: [this.employee?.title, Validators.required],
      name: [this.employee?.name, Validators.required],
      email: [this.employee?.email, [Validators.required, Validators.email]],
      dob: [
        this.employee?.dob
          ? this.datePipe.transform(this.employee?.dob, 'yyyy-MM-dd')
          : '',
        [Validators.required],
      ],
      department: [this.employee?.departmentId, [Validators.required]],
    });
  }

  get f() {
    return this.editEmployeeForm?.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editEmployeeForm?.invalid) {
      return;
    }

    const newEmployee = {
      id: this.employee?.id,
      title: this.editEmployeeForm?.get('title')?.value,
      name: this.editEmployeeForm?.get('name')?.value,
      email: this.editEmployeeForm?.get('email')?.value,
      dob: this.editEmployeeForm?.get('dob')?.value,
      departmentId: parseInt(this.editEmployeeForm?.get('department')?.value),
    } as EditEmployeeModel;

    this.employeeService.update(newEmployee).subscribe({
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
