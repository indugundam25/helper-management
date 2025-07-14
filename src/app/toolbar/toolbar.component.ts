import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
@Output() addHelperClicked = new EventEmitter<void>();

onAddHelper() {
  this.addHelperClicked.emit();
}
}
