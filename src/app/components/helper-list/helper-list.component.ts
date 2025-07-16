import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperTabComponent } from '../helper-tab/helper-tab.component';

@Component({
  selector: 'app-helper-list',
  standalone: true,
  imports: [CommonModule, HelperTabComponent],
  templateUrl: './helper-list.component.html',
  styleUrls: ['./helper-list.component.scss']
})
export class HelperListComponent {
  @Input() helpers: any[] = [];
  @Input() selectedHelperId: string | null = null;

  @Output() selectHelper = new EventEmitter<any>();
  @Output() addHelper = new EventEmitter<void>();

  onSelect(helper: any) {
    this.selectHelper.emit(helper);
  }

  onAdd() {
    this.addHelper.emit();
  }
}
