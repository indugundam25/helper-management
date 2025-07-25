import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IHelper } from '../../models/helper.model';
import { HelperService } from '../../services/helper.service';
import axios from 'axios';

@Component({
  selector: 'app-helper-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './helper-list.component.html',
  styleUrls: ['./helper-list.component.scss']
})
export class HelperListComponent implements OnInit {
  @Input() helpers: IHelper[] = [];
  @Output() sendCount = new EventEmitter<number>();
  @Output() helperSelected = new EventEmitter<IHelper>();

  constructor(public helperService: HelperService) { };

  onCardClick(helper: IHelper) {
    this.helperSelected.emit(helper);
  }

  getCount() {
    this.sendCount.emit(this.helpers.length);
    console.log(this.sendCount);
  }

  getInitials(name: string): string {
    return name ? name.trim().substring(0, 2).toUpperCase() : '';
  }


  ngOnInit(): void {
    axios.get('http://localhost:3000/api/helpers')
      .then((response) => {
        this.helpers = response.data.helpers;
      })
      .catch((error) => {
        console.error('Error fetching helpers:', error);
      });
  }

}
