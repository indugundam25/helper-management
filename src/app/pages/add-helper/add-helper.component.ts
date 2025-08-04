import { Component } from '@angular/core';
import { TrackDetailsComponent } from '../../components/track-details/track-details.component';
import { HelperFormComponent } from '../../components/helper-form/helper-form.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronLeft } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { EditTrackDetailsComponent } from '../../components/edit-track-details/edit-track-details.component';
@Component({
  selector: 'app-add-helper',
  standalone: true,
  imports: [TrackDetailsComponent, HelperFormComponent, CommonModule, LucideAngularModule, RouterLink, EditTrackDetailsComponent],
  templateUrl: './add-helper.component.html',
  styleUrl: './add-helper.component.scss'
})
export class AddHelperComponent {
  readonly chevronleft = ChevronLeft;
  step: number = 1;

  constructor(public helperService: HelperService) { };
  updateStep(step: number) {
    this.step = step;
  }
}


