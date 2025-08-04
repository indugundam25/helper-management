import { Component } from '@angular/core';
import { LucideAngularModule, Hammer, Files } from 'lucide-angular';
@Component({
  selector: 'app-edit-track-details',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './edit-track-details.component.html',
  styleUrl: './edit-track-details.component.scss'
})
export class EditTrackDetailsComponent {
  files = Files;
  hammer = Hammer;
}
