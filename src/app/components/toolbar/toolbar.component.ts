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
  readonly funnel = Funnel;
  readonly download = Download;
  readonly arrowDownUp = ArrowDownUp;
  readonly calendar = Calendar;
  readonly search = Search;
  x = X;
  isTouched = false;
  searchText = '';
  helpersCount = 0;

  @Output() addHelperClicked = new EventEmitter<void>();
  @Input() count: number = 0;

  constructor(private helperService: HelperService) { };

  ngOnInit(): void {
    this.helperService.getAllHelpers().subscribe((response) => {
      if (response?.helpers) {
        this.helpersCount = response.helpers.length;
      }
    });
  }

  onAddHelper() {
    this.addHelperClicked.emit();
  }

  displayAll() {

  }

  sortByName() {

  }

}
