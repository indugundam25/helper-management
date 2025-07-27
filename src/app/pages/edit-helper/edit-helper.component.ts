import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../../services/helper.service';
import { IHelper } from '../../models/helper.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, } from '@angular/router';
import { UpdateDialogComponent } from '../../components/update-dialog/update-dialog.component';

@Component({
  selector: 'app-edit-helper-form',
  standalone: true,
  templateUrl: './edit-helper.component.html',
  styleUrls: ['./edit-helper.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatOptionModule,
    RouterLink
  ]
})
export class EditHelperComponent implements OnInit {
  editForm!: FormGroup;
  helperData!: IHelper;

  serviceTypes = ['Cook', 'Driver', 'Maid', 'Lawyer', 'Nurse', 'Plumber'];
  organizations = ['ASBL', 'Spring Helpers'];
  languageOptions = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Urdu'];
  vehicleTypes = ['None', 'Auto', 'Bike', 'Car'];

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); //from route /editHelper:/id
    if (id) {
      this.helperService.getHelper(id).subscribe(helper => {
        this.helperData = helper;
        this.initForm();
      });
    }
  }

  initForm() {
    this.editForm = this.fb.group({
      name: [this.helperData?.name, Validators.required],
      role: [this.helperData?.role, Validators.required],
      organization: [this.helperData?.organization, Validators.required],
      gender: [this.helperData?.gender, Validators.required],
      phone: [this.helperData?.phone, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: [this.helperData?.email],
      languages: [this.helperData?.languages || []],
      vehicleType: [this.helperData?.vehicleType || 'None'],
      number: [this.helperData?.number || ''],
      // documents: [this.helperData?.documents || []],
      // photoUrl: [this.helperData?.photoUrl],
    });

    this.editForm.get('vehicleType')?.valueChanges.subscribe(value => {
      if (value !== 'None' && !this.editForm.get('number')) {
        this.editForm.addControl('number', this.fb.control('', Validators.required));
      } else if (value === 'None') {
        this.editForm.removeControl('number');
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid || !this.helperData?._id) {
      this.editForm.markAllAsTouched();
      return;
    }

    const updatedData: IHelper = {
      ...this.helperData,
      ...this.editForm.value
    };

    this.helperService.updateHelper(this.helperData._id, updatedData).subscribe({
      next: (res) => {
        this.dialog.open(UpdateDialogComponent, {
          width: '500px',
          disableClose: true
        });
      },
      error: (err) => {
        console.error('Update failed:', err);
      }
    });
  }
}
