import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { HelperFormComponent } from '../helper-form/helper-form.component';
import { SharedStepService } from '../../services/shared.service';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HelperFormComponent,
  ],
  templateUrl: './track-details.component.html',
  styleUrl: './track-details.component.scss'
})
export class TrackDetailsComponent {

  step = 1;

  constructor(private sharedStepService: SharedStepService) { }

  ngOnInit(): void {
    this.sharedStepService.step$.subscribe(currentStep => {
      this.step = currentStep;
      console.log('Step received in TrackDetails:', this.step);
    });
  }

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
}
