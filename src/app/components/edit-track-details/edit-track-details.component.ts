import { Component } from '@angular/core';
import { LucideAngularModule, Hammer, Files } from 'lucide-angular';
import { HelperService } from '../../services/helper.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-track-details',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './edit-track-details.component.html',
  styleUrl: './edit-track-details.component.scss'
})
export class EditTrackDetailsComponent {
  files = Files;
  hammer = Hammer;
  selectedButton: string = 'button1';

  constructor(public helperservice: HelperService) { this.helperservice.isStepOne = true; this.helperservice.isDocClicked = false }

  selectButton(button: string) {
    this.selectedButton = button;
  }
  openDocs() {
    this.helperservice.isDocClicked = true;
    this.helperservice.isStepOne = false;
  }
  openDetails() {
    this.helperservice.isStepOne = true;
    this.helperservice.isDocClicked = false;
  }
}
