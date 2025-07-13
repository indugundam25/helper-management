import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-helper-details',
  standalone: true,
  templateUrl: './helper-details.component.html',
  styleUrls: ['./helper-details.component.scss']
})
export class HelperDetailsComponent {
  @Input() helper: any;
}
