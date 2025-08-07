import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-helper-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './helper-list.component.html',
  styleUrls: ['./helper-list.component.scss']
})
export class HelperListComponent {

  constructor(public helperService: HelperService) {
    console.log(this.helperService._selectedHelper());
  };

  getInitials(name: string): string {
    return name ? name.trim().substring(0, 2).toUpperCase() : '';
  }
}
