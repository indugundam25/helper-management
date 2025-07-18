import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Pencil, Trash } from 'lucide-angular';

@Component({
  selector: 'app-helper-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './helper-details.component.html',
  styleUrls: ['./helper-details.component.scss']
})
export class HelperDetailsComponent {
  readonly pencil = Pencil;
  readonly trash = Trash;
  @Input() helper: any;
}

