import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateEmployeeModel } from '../models/create-employee-model';
import { EditEmployeeModel } from '../models/edit-employee-model';
import { EmployeeListModel } from '../models/employee-list-model';
import { GetEmployeesModel } from '../models/get-employees-model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/Employee`;
  constructor(private httpClient: HttpClient) {}

  create(employee: CreateEmployeeModel) {
    return this.httpClient.post<CreateEmployeeModel>(this.apiUrl, employee);
  }

  get(searchKeyword: string) {
    let url = searchKeyword
      ? `${this.apiUrl}?searchKeyword=${searchKeyword}`
      : this.apiUrl;
    return this.httpClient.get<EmployeeListModel[]>(url);
  }

  getEmployee(id: number) {
    return this.httpClient.get<EditEmployeeModel>(`${this.apiUrl}/${id}`);
  }

  update(employee: EditEmployeeModel) {
    return this.httpClient.put<boolean>(this.apiUrl, employee);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
