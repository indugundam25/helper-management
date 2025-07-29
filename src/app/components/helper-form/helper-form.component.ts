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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { HelperService } from '../../services/helper.service';
import { HelperSuccessDialogComponent } from '../helper-success-dialog/helper-success-dialog.component';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';
import { SharedStepService } from '../../services/shared.service';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { IHelper } from '../../models/helper.model';
import { ActivatedRoute } from '@angular/router';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

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
    LucideAngularModule,
    MatProgressSpinnerModule
  ]
})
export class HelperFormComponent implements OnInit {
  plus = Plus;
  filename: string = '';
  selectedFile: File | undefined;
  selectedDocuments: File[] = [];
  isLoading = false;

  serviceTypes = ['Cook', 'Driver', 'Maid', 'Lawyer', 'Nurse', 'Plumber'];
  organizations = ['ASBL', 'Spring Helpers'];
  languageOptions = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Urdu'];
  vehicleTypes = ['None', 'Auto', 'Bike', 'Car'];
  showSuccess = false;

  @Output() helperAdded = new EventEmitter<string>();
  @Output() stepOutPut = new EventEmitter<number>();
  @Input() step: number = 1;
  @Input() helperForm!: FormGroup;
  @Input() helperFormEdit!: FormGroup;
  helperData!: IHelper;


  constructor(
    private fb: FormBuilder,
    public helperService: HelperService,
    private dialog: MatDialog,
    private sharedStepService: SharedStepService,
    private route: ActivatedRoute,

  ) { }
  ngOnInit(): void {
    this.helperForm = this.fb.group({
      photoUrl: [''],
      photoPublicId: [''],
      photoPreview: [''],
      empId: [''],
      role: [''],
      organization: [''],
      name: [''],
      languages: [[]],
      gender: [''],
      phone: ['', [Validators.pattern(/^\d{10}$/)]],
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

    if (this.helperService.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id'); //from route /editHelper:/id
      if (id) {
        this.helperService.getHelper(id).subscribe(helper => {
          this.helperData = helper;
          this.patchForm();
        });
      }
    }
  }

  patchForm() {
    this.helperForm = this.fb.group({
      name: [this.helperData?.name, Validators.required],
      role: [this.helperData?.role, Validators.required],
      organization: [this.helperData?.organization, Validators.required],
      gender: [this.helperData?.gender, Validators.required],
      phone: [this.helperData?.phone, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: [this.helperData?.email],
      languages: [this.helperData?.languages || []],
      vehicleType: [this.helperData?.vehicleType || 'None'],
      number: [this.helperData?.number || ''],
      photoPreview: this.helperData.photoUrl,
      documents: [this.helperData?.documents || []],
      photoUrl: [this.helperData?.photoUrl],
    });

    this.helperForm.get('vehicleType')?.valueChanges.subscribe(value => {
      if (value !== 'None' && !this.helperForm.get('number')) {
        this.helperForm.addControl('number', this.fb.control('', Validators.required));
      } else if (value === 'None') {
        this.helperForm.removeControl('number');
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
        this.helperForm.patchValue({
          photoPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }



  onSubmit(): void {

    if (this.helperService.isEditMode) {
      if (this.helperForm.invalid || !this.helperData?._id) {
        this.helperForm.markAllAsTouched();
        return;
      }

      const updatedData: IHelper = {
        ...this.helperData,
        ...this.helperForm.value
      }; //copying old helperData intp updatedData and then overriding it with new helperForm data

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
    if (this.helperForm.invalid) {
      this.helperForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.selectedDocuments.forEach(file => {
      formData.append('documents', file);
    });

    const helperData = { ...this.helperForm.value };
    delete helperData.photoPreview;
    formData.append('helperData', JSON.stringify(helperData));

    this.helperService.addHelper(formData).subscribe({
      next: (response) => {
        const users = [this.helperService._users(), response];
        this.helperService._users.set(users);

        this.isLoading = false;

        const dialogRef = this.dialog.open(HelperSuccessDialogComponent, {
          width: '350px',
          disableClose: true,
          data: { name: this.helperForm.value.name }
        });

        dialogRef.afterClosed().subscribe(() => {
          this.helperAdded.emit(response.helpers._id);
        });
      },
      error: (err) => {
        console.error('Failed to add helper:', err);
        this.isLoading = false;
      }
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      for (let i = 0; i < input.files.length; i++) {
        this.selectedDocuments.push(input.files[i]);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DocumentDialogComponent, {
      data: { flag: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.helperForm.patchValue({
          documents: [{
            type: result.documentType,
            fileName: result.fileName,
          }]
        });
        this.selectedDocuments.push(result.file);
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
