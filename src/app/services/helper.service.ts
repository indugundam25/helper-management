
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IHelper } from '../models/helper.model';

@Injectable({ providedIn: 'root' })
export class HelperService {
  private apiUrl = 'http://localhost:3000/api/helpers';

  constructor(private http: HttpClient) { }

  addHelper(helper: IHelper): Observable<ApiResponse<IHelper>> {
    return this.http.post<ApiResponse<IHelper>>(`${this.apiUrl}`, helper);
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

}
