import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Funnel, Download, ArrowDownUp, Calendar, Search, X } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HelperService } from '../../services/helper.service';
import { FilterService } from '../../services/filters.service';
import { IHelper } from '../../models/helper.model';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from '../filter/filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    FilterComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  funnel = Funnel;
  download = Download;
  arrowDownUp = ArrowDownUp;
  calendar = Calendar;
  search = Search;
  x = X;
  isTouched = false;
  searchText = '';
  helpers: IHelper[] = [];
  typedText: string = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  showDateFilter = false;

  constructor(private dialog: MatDialog, public helperService: HelperService, private filterService: FilterService) { };

  async ngOnInit() {
    await this.helperService.getAllUsers();
  }

  sortHelper() {
    this.filterService.sortByName();
  }

  sortByID() {
    this.filterService.sortByID();
  }
  searchHelper() {
    const input = document.getElementById('text') as HTMLInputElement;
    this.typedText = input?.value ?? '';

    if (this.typedText.length > 0) {
      this.filterService.searchHelpers(this.typedText);
    }
    else {
      this.helperService._users.set(this.helperService._dupusers());
      this.helperService.onSelecthelper(this.helperService._users()[0]);
    }
  }

  clearSearch() {
    const inputEl = document.getElementById('text') as HTMLInputElement;
    if (inputEl) {
      inputEl.value = '';
      this.helperService._users.set(this.helperService._dupusers());
    }
    this.helperService.onSelecthelper(this.helperService._users()[0]);
  }
  filterHelpers() {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '300px',
      height: '320px',
      disableClose: false,
      panelClass: 'top-right-dialog',
      position: {
        top: '50px',
        left: '50px',
      },
      data: {

      }
    });
  }

  toggleDateFilterPanel() {
    this.showDateFilter = !this.showDateFilter;
  }

  applyDateFilter() {
    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);
      to.setHours(23, 59, 59, 999);
      this.filterService.filterHelpersByDate(from, to);
      this.showDateFilter = false;
    }
  }

  resetDateFilter() {
    this.helperService._users.set(this.helperService._dupusers());
    this.showDateFilter = false;
    this.helperService._selectedHelper.set(this.helperService._users()[0]);
    this.fromDate = null;
    this.toDate = null;
  }

}

