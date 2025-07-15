import { Component } from '@angular/core';
import { TrackDetailsComponent } from '../../components/track-details/track-details.component';
import { HelperFormComponent } from '../../components/helper-form/helper-form.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronLeft} from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-helper',
  standalone: true,
  imports: [TrackDetailsComponent, HelperFormComponent, CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './add-helper.component.html',
  styleUrl: './add-helper.component.scss'
})
export class AddHelperComponent {
  readonly chevronleft = ChevronLeft;
}


