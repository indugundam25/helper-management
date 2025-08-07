import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { HelperFormComponent } from '../helper-form/helper-form.component';
import { CommonModule } from '@angular/common';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [
    CommonModule,
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
export class TrackDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') stepper!: MatStepper;

  step = 1;

  private _formBuilder = inject(FormBuilder);
  constructor(private helperService: HelperService) { }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  ngOnInit(): void {
    this.helperService.step$.subscribe(currentStep => {
      this.step = currentStep;
      console.log('Step received in TrackDetails:', this.step);

      if (this.stepper) {
        this.stepper.selectedIndex = this.step - 1;
      }
    });
  }

  ngAfterViewInit(): void {
    this.stepper.selectedIndex = this.step - 1;
  }
}
