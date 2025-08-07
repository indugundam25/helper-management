import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHelper } from '../models/helper.model';
import { signal } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

@Injectable({ providedIn: 'root' })
export class HelperService {

  _users = signal<any[]>([]);
  _dupusers = signal<any[]>([]);
  _selectedHelper = signal<any>(this._users()[0]);
  isEditMode = false;
  isDeleteMode = false;
  isDocClicked = false;
  isStepOne = true;
  helpersData: any;
  private stepSource = new BehaviorSubject<number>(1);
  step$ = this.stepSource.asObservable();

  private apiUrl = 'http://localhost:3000/api/helpers';

  constructor(private http: HttpClient) { }

  addHelper(data: FormData) {
    return this.http.post<{ helper: IHelper }>(`${this.apiUrl}`, data);
  }

  updateHelper(id: string, data: FormData) {
    return this.http.put<{ helper: any }>(`${this.apiUrl}/${id}`, data);
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
        this.helpersData = res.helpers;
        console.log(this.helpersData[0].createdAt);
        this._dupusers.set(res.helpers);
        this._selectedHelper.set(this._users()[0]);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  exportToExcel(): void {
    const exportData = this.helpersData.map((helper: { name: any; role: any; email: any; phone: any; organization: any; languages: any[]; createdAt: any }) => ({
      Name: helper.name,
      Role: helper.role,
      Email: helper.email || '-',
      Phone: helper.phone,
      Organization: helper.organization,
      Languages: helper.languages?.join(', '),
      JoinedOn: this.formatDate(new Date(helper.createdAt))
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob = new Blob([excelBuffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });

    FileSaver.saveAs(blob, 'helpers-export.xlsx');
  }

  formatDate(dateString: Date): string {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${date}-${month}-${year}`;
  }

  onSelecthelper(User: any) {
    this._selectedHelper.set(User);
  }

  setStep(step: number) {
    this.stepSource.next(step);
  }

  get currentStep() {
    return this.stepSource.getValue();
  }
}
