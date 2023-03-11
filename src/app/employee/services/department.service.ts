import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateEmployeeModel } from '../models/create-employee-model';
import { GetDepartmentsModel } from '../models/get-departments-model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = `${environment.apiUrl}/department`;
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get<GetDepartmentsModel[]>(this.apiUrl);
  }
}
