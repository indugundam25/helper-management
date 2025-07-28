import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { IHelper } from '../../models/helper.model';
import { IHelper } from '../../../../backend/src/models/helper.model';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-helper-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './helper-list.component.html',
  styleUrls: ['./helper-list.component.scss']
})
export class HelperListComponent {
  @Output() helperSelected = new EventEmitter<IHelper>();

  constructor(public helperService: HelperService) { };

  onCardClick(helper: IHelper) {
    this.helperSelected.emit(helper); //to display selected helper in helper-details
  }

  getInitials(name: string): string {
    return name ? name.trim().substring(0, 2).toUpperCase() : '';
  }
}
