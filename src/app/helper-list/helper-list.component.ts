import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-helper-list',
  standalone: true,
  imports : [CommonModule],
  templateUrl: './helper-list.component.html',
  styleUrls: ['./helper-list.component.scss']
})
export class HelperListComponent {
  @Output() helperSelected = new EventEmitter<any>();

  helpers = [
    { name: 'Alice', role: 'Nurse' },
    { name: 'Bob', role: 'Attendant' },
    { name: 'Charlie', role: 'Technician' }
  ];

  selectHelper(helper: any) {
    this.helperSelected.emit(helper);
  }
}
