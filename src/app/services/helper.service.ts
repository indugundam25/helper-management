
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IHelper } from '../models/helper.model';

import axios from 'axios';
import { signal } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class HelperService {

  _users = signal<any[]>([]);

  private apiUrl = 'http://localhost:3000/api/helpers';

  constructor(private http: HttpClient) { }

  addHelper(data: FormData) {
    return this.http.post<{ helpers: any }>(`${this.apiUrl}`, data);
  }

  updateHelper(id: string, helper: IHelper): Observable<ApiResponse<IHelper>> {
    return this.http.put<ApiResponse<IHelper>>(`${this.apiUrl}/${id}`, helper);
  }

  deleteHelper(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getHelper(id: string): Observable<ApiResponse<IHelper>> {
    return this.http.get<ApiResponse<IHelper>>(`${this.apiUrl}/${id}`);

  }
  getAllHelpers(): Observable<ApiResponse<IHelper[]>> {
    return this.http.get<ApiResponse<IHelper[]>>(`${this.apiUrl}`);

  }

  getAllUsers() {
    this.getAllHelpers().subscribe({
      next: (res) => {
        this._users.set(res.helpers);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }



  // async getAllHelpers(): Promise<IHelper[]> {
  //   const response = await axios.get(this.apiUrl);
  //   return response.data;
  // }

  // createHelper(data: FormData) {
  //   return this.http.post<{ helper: any }>('http://localhost:3000/api/helpers', data);
  // }
}
