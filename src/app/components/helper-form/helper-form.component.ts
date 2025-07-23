import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../../services/helper.service';
import { HelperSuccessDialogComponent } from '../helper-success-dialog/helper-success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { HelperDetailsComponent } from '../helper-details/helper-details.component';
import { SharedStepService } from '../../services/shared.service';

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
  // helperForm!: FormGroup;
  photoUrl: string | ArrayBuffer | null = null;
  filename: string = '';
  selectedFile: File | undefined;
  serviceTypes = ['Cook', 'Driver', 'Maid', 'Lawyer', 'Nurse', 'Plumber'];
  organizations = ['ASBL', 'Spring Helpers'];
  languageOptions = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Urdu'];
  vehicleTypes = ['None', 'Auto', 'Bike', 'Car'];
  docUrl: string | ArrayBuffer | null = null;
  onCloseModel: any;
  showSuccess = false;
  @Output() helperAdded = new EventEmitter<string>();
  @Output() stepOutPut = new EventEmitter<number>();
  @Input() step: number = 1;
  @Input() helperForm !: FormGroup;

  prevId: number = 10000;

  constructor(private fb: FormBuilder, private helperService: HelperService,
    private dialog: MatDialog, private sharedStepService: SharedStepService) { }

  ngOnInit(): void {
    this.helperForm = this.fb.group({
      photo: [null],
      empId: [''],
      role: ['', Validators.required],
      organization: ['', Validators.required],
      name: ['', Validators.required],
      languages: [[]],
      gender: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]],
      email: ['', Validators.email],
      vehicleType: ['None'],
      documents: [[],]
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
    if (input.files?.length) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('profile', file);

      // this.helperService.uploadPhoto(formData).subscribe({
      //   next: (res) => {
      //     this.photoUrl = res.url; // Set preview
      //     this.helperForm.patchValue({ photo: res.url });
      //   },
      //   error: (err) => {
      //     console.error('Photo upload failed', err);
      //   }
      // });
    }
  }

  base64ToBlob = (base64: string, contentType: string): Blob => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) =>
      byteCharacters.charCodeAt(i)
    );
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };


  onClose() {
    this.onCloseModel.emit(false);
  }
  onSubmit(): void {
    if (this.helperForm.valid) {
      const dialogRef = this.dialog.open(HelperSuccessDialogComponent, {
        width: '350px',
        disableClose: true,
        data: { name: this.helperForm.value.name }
      });
      this.helperService.addHelper(this.helperForm.value).subscribe({
        next: (response) => {
          dialogRef.afterClosed().subscribe(() => {
            this.helperAdded.emit(response.helpers._id);
            this.onClose();
          });
        }
      });
      // const formData = new FormData();
      // formData.append('name', this.helperForm.get('name')?.value);
      // append all other fields

      // if (this.photoBase64) {
      //   const blob = base64ToBlob(this.photoBase64, 'image/jpeg'); // or detect mime
      //   const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      //   formData.append('photo', file);
      // }

      // this.helperService.createHelper(formData).subscribe(...);

    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('document', file);

      // this.helperService.uploadDocument(formData).subscribe({
      //   next: (res: { url: any; }) => {
      //     const currentDocs = this.helperForm.get('documents')?.value || [];
      //     const newDoc = {
      //       fileName: file.name,
      //       type: 'kyc',
      //       url: res.url
      //     };
      //     this.helperForm.patchValue({ documents: [...currentDocs, newDoc] });
      //   },
      //   error: (err: any) => {
      //     console.error('Document upload failed', err);
      //   }
      // });
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
        console.log('Document added:', newDocument);
      }
    });
  }

  closeDialog() {
    this.showSuccess = true;
  }

  nextStep(): void {
    if (this.step === 1) {
      if (
        this.helperForm.get('role')?.valid &&
        this.helperForm.get('organization')?.valid &&
        this.helperForm.get('name')?.valid &&
        this.helperForm.get('phone')?.valid &&
        (this.helperForm.get('vehicleType')?.value === 'None' || this.helperForm.get('number')?.valid)
      ) {
        const next = this.step;
        this.sharedStepService.setStep(next);
        this.step++;
      } else {
        this.helperForm.get('role')?.markAsTouched();
        this.helperForm.get('organization')?.markAsTouched();
        this.helperForm.get('name')?.markAsTouched();
        this.helperForm.get('phone')?.markAsTouched();
        if (this.helperForm.get('vehicleType')?.value !== 'None') {
          this.helperForm.get('number')?.markAsTouched();
        }
      }
    } else {
      this.step++;
    }
    const next = this.step;
    this.sharedStepService.setStep(next);
  }


  prevStep() {
    this.step--;
    this.sharedStepService.setStep(this.step)
  }
}
