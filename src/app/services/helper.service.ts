import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHelper } from '../models/helper.model';
import { signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HelperService {

  _users = signal<any[]>([]);
  _dupusers = signal<any[]>([]);
  _selectedHelper = signal<any>(this._users()[0]);
  isEditMode = false;
  private apiUrl = 'http://localhost:3000/api/helpers';

  constructor(private http: HttpClient) { }
  addHelper(data: FormData) {
    return this.http.post<{ helper: IHelper }>(`${this.apiUrl}`, data);
  }

  updateHelper(id: string, helper: IHelper | FormData) {
    return this.http.put<{ helper: any }>(`${this.apiUrl}/${id}`, helper);
  }

  deleteHelper(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getHelper(id: string) {
    return this.http.get<IHelper>(`${this.apiUrl}/${id}`);
  }

  getAllHelpers() {
    return this.http.get<{ helpers: any }>(`${this.apiUrl}`);

  }

  getAllUsers() {
    this.getAllHelpers().subscribe({
      next: (res) => {
        this._users.set(res.helpers);
        this._dupusers.set(res.helpers);
        this._selectedHelper.set(this._users()[0]);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSelecthelper(User: any) {
    this._selectedHelper.set(User);
  }
}
