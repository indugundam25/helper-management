import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    LucideAngularModule, RouterLink, MatButtonModule, MatMenuModule, CommonModule, FilterComponent],
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
  helpersCount = 0;

  @Output() addHelperClicked = new EventEmitter<void>();
  @Input() count: number = 0;
  helpers: IHelper[] = [];
  typedText: string = '';

  constructor(private dialog: MatDialog, private helperService: HelperService, private filterService: FilterService) { };

  async ngOnInit(): Promise<void> {
    this.helperService.getAllHelpers().subscribe((response) => {
      if (response?.helpers) {
        this.helpersCount = response.helpers.length;
      }
    });
    this.helperService.getAllUsers();
  }

  onAddHelper() {
    this.addHelperClicked.emit();
    console.log(this.helperService._users());
  }

  sortHelper() {
    this.filterService.sortByName('asc');
  }

  sortByID() {
    this.filterService.sortByID();
  }
  searchHelper() {
    const input = document.getElementById('text') as HTMLInputElement;
    this.typedText = input?.value ?? '';

    if (this.typedText.length) {
      this.filterService.searchHelpers(this.typedText);
    }
  }

  clearSearch() {
    const inputEl = document.getElementById('text') as HTMLInputElement;
    if (inputEl) {
      inputEl.value = '';
      this.helperService._users.set(this.helperService._dupusers());
    }
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
}

