import { Component, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule , Funnel, Download, ArrowDownUp, Calendar, Search} from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    LucideAngularModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  readonly funnel = Funnel;
  readonly download = Download;
  readonly arrowDownUp = ArrowDownUp;
  readonly calendar = Calendar;
  readonly search = Search;
@Output() addHelperClicked = new EventEmitter<void>();

onAddHelper() {
  this.addHelperClicked.emit();
}
}
