import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { EmployeeListModel } from '../models/employee-list-model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeListModel[] | undefined;
  selectedEmployee: EmployeeListModel | undefined;
  modalRef?: NgbModalRef;
  timeout: any = null;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getList('');
  }

  getList(searchKeyword: string) {
    this.employeeService.get(searchKeyword).subscribe({
      next: (result) => {
        if (result) this.employees = result;
      },
      error: (err) => {
        console.log(err);
        alert('Some error occured. Please try again.');
      },
    });
  }

  confirm(employee: EmployeeListModel, content: any) {
    this.selectedEmployee = employee;
    this.open(content);
  }

  open(content: any) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  delete() {
    if (this.selectedEmployee) {
      this.employeeService.delete(this.selectedEmployee.id).subscribe({
        next: (result) => {
          this.modalRef?.close();
          if (result) this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
          alert('Some error occured. Please try again.');
        },
      });
    }
  }

  onKeySearch(event: any) {
    let local = this;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        local.search(event.target.value);
      }
    }, 1000);
  }

  search(keyword: string) {
    keyword ? this.getList(keyword) : this.getList('');
  }
}
