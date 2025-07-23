import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { HelperService } from '../../services/helper.service';
import { HelperSuccessDialogComponent } from '../helper-success-dialog/helper-success-dialog.component';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';
import { HelperDetailsComponent } from '../helper-details/helper-details.component';
import { SharedStepService } from '../../services/shared.service';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'app-helper-form',
  templateUrl: './helper-form.component.html',
  styleUrls: ['./helper-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DocumentDialogComponent,
    LucideAngularModule,
    HelperDetailsComponent
  ]
})
export class HelperFormComponent implements OnInit {
  plus = Plus;
  photoUrl: string | ArrayBuffer | null = null;
  filename: string = '';
  selectedFile: File | undefined;

  serviceTypes = ['Cook', 'Driver', 'Maid', 'Lawyer', 'Nurse', 'Plumber'];
  organizations = ['ASBL', 'Spring Helpers'];
  languageOptions = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Urdu'];
  vehicleTypes = ['None', 'Auto', 'Bike', 'Car'];
  showSuccess = false;

  @Output() helperAdded = new EventEmitter<string>();
  @Output() stepOutPut = new EventEmitter<number>();
  @Input() step: number = 1;
  @Input() helperForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private dialog: MatDialog,
    private sharedStepService: SharedStepService
  ) { }

  ngOnInit(): void {
    this.helperForm = this.fb.group({
      photo: [null],
      photoUrl: [''],
      photoPublicId: [''],
      photoPreview: [''],
      empId: [''],
      role: ['', Validators.required],
      organization: ['', Validators.required],
      name: ['', Validators.required],
      languages: [[]],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', Validators.email],
      vehicleType: ['None'],
      documents: [[]]
    });

    this.helperForm.get('vehicleType')?.valueChanges.subscribe((value) => {
      const form = this.helperForm;
      if (value && value !== 'None') {
        if (!form.get('number')) {
          form.addControl('number', this.fb.control('', Validators.required));
        }
      } else {
        if (form.get('number')) {
          form.removeControl('number');
        }
      }
    });
  }

  getInitials(name: string): string {
    return name ? name.trim().substring(0, 2).toUpperCase() : '';
  }

  onPhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      this.filename = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.photoUrl = reader.result;
        this.helperForm.patchValue({
          photoPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.helperForm.invalid) {
      this.helperForm.markAllAsTouched();
      return;
    }

    // Step 1: Create FormData object
    const formData = new FormData();

    // Step 2: Append photo (file)
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    // Step 3: Remove UI-only field
    const helperData = { ...this.helperForm.value };
    delete helperData.photoPreview;

    // Step 4: Append form data as JSON
    formData.append('helperData', JSON.stringify(helperData));

    // Step 5: Open dialog
    const dialogRef = this.dialog.open(HelperSuccessDialogComponent, {
      width: '350px',
      disableClose: true,
      data: { name: this.helperForm.value.name }
    });

    // Step 6: Submit to backend
    this.helperService.addHelper(formData).subscribe({
      next: (response) => {
        dialogRef.afterClosed().subscribe(() => {
          this.helperAdded.emit(response.helpers._id);
        });
      },
      error: (err) => {
        console.error('Failed to add helper:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('document', file);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DocumentDialogComponent, {
      data: { flag: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.base64Data) {
        const currentDocuments = this.helperForm.get('documents')?.value || [];
        const newDocument = {
          type: result.documentType,
          fileName: result.fileName,
          base64Data: result.base64Data
        };
        this.helperForm.patchValue({
          documents: [...currentDocuments, newDocument]
        });
      }
    });
  }

  nextStep(): void {
    if (this.step === 1) {
      const form = this.helperForm;
      if (
        form.get('role')?.valid &&
        form.get('organization')?.valid &&
        form.get('name')?.valid &&
        form.get('phone')?.valid &&
        (form.get('vehicleType')?.value === 'None' || form.get('number')?.valid)
      ) {
        this.step++;
        this.sharedStepService.setStep(this.step);
      } else {
        form.get('role')?.markAsTouched();
        form.get('organization')?.markAsTouched();
        form.get('name')?.markAsTouched();
        form.get('phone')?.markAsTouched();
        if (form.get('vehicleType')?.value !== 'None') {
          form.get('number')?.markAsTouched();
        }
      }
    } else {
      this.step++;
      this.sharedStepService.setStep(this.step);
    }
  }

  prevStep() {
    this.step--;
    this.sharedStepService.setStep(this.step);
  }
}
