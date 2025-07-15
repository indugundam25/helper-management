// src/app/services/helper.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HelperService {
  private apiUrl = 'http://localhost:3000/api/helpers'; 

  constructor(private http: HttpClient) {}

  addHelper(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
