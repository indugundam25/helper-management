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
  @Input() selectedHelperId: string | null = null;

  @Output() selectedHelperChange = new EventEmitter<IHelper>();
  @Output() addHelper = new EventEmitter<void>();

  constructor(private helperService: HelperService) { }

  ngOnInit(): void {
    axios.get('http://localhost:3000/api/helpers')
      .then((response) => {
        console.log(response.data.helpers);
        this.helpers = response.data.helpers;
      })
      .catch((error) => {
        console.error('Error fetching helpers:', error);
      });
    this.selectedHelperChange.emit(this.helpers[0]);
  }


  onSelect(helper: IHelper): void {
    this.selectedHelperChange.emit(helper);
  }

  onAdd(): void {
    this.addHelper.emit();
  }


}
