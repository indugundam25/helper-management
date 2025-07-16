import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperTabComponent } from '../helper-tab/helper-tab.component';
import { LucideAngularModule , Pencil, Trash} from 'lucide-angular';

@Component({
  selector: 'app-helper-details',
  standalone: true,
  imports : [CommonModule, HelperTabComponent, LucideAngularModule],
  templateUrl: './helper-details.component.html',
  styleUrls: ['./helper-details.component.scss']
})
export class HelperDetailsComponent {
  readonly pencil = Pencil;
  readonly trash = Trash;
  @Input() helper: any;
}

