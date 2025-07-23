import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { LucideAngularModule, Funnel, Download, ArrowDownUp, Calendar, Search, X } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HelperService } from '../../services/helper.service';
import { IHelper } from '../../models/helper.model';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    LucideAngularModule, RouterLink, MatButtonModule, MatMenuModule, CommonModule],
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

  @Output() addHelperClicked = new EventEmitter<void>(); //add helper button to open form
  @Input() count: number = 0;
  helpers: IHelper[] | any;

  constructor(private helperService: HelperService) { };

  ngOnInit(): void {
    this.helperService.getAllHelpers().subscribe((response) => {
      if (response?.helpers) {
        this.helpersCount = response.helpers.length;
      }
    });
    console.log(this.helpers)
  }

  onAddHelper() {
    this.addHelperClicked.emit();
  }

  displayAll() {

  }

  sortByName() {
    this.helperService.sort({}, 'name', 'asc', 1).subscribe((data) => {
      this.helpers = data.helpers;
    });
  }
}

