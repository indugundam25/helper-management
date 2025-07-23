
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IHelper } from '../models/helper.model';

@Injectable({ providedIn: 'root' })
export class HelperService {

  private apiUrl = 'http://localhost:3000/api/helpers';

  constructor(private http: HttpClient) { }

  addHelper(data: any) {
    return this.http.post<{ helpers: any }>('http://localhost:3000/api/helpers', data);
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
  createHelper(data: FormData) {
    return this.http.post<{ helper: any }>('http://localhost:3000/api/helpers', data);
  }

  sort(filter = {}, sortField: string = '', sortOrder: 'asc' | 'desc' = 'asc', page: number = 1) {
    const params: any = {
      page,
      sort: JSON.stringify({ [sortField]: sortOrder === 'asc' ? 1 : -1 }),
      filter: JSON.stringify(filter)
    };

    return this.http.get<any>('http://localhost:3000/api/helpers', { params });
  }


}
