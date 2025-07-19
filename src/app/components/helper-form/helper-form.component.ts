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

  readonly plus = Plus;
  helperForm!: FormGroup;
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


  constructor(private fb: FormBuilder, private helperService: HelperService,
    private dialog: MatDialog, private sharedStepService: SharedStepService) { }

  ngOnInit(): void {
    this.helperForm = this.fb.group({
      photo: [null],
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

  onPhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.photoUrl = reader.result;
        const base64String = (reader.result as string).split(',')[1];
        this.helperForm.patchValue({ photo: base64String });
      };
      reader.readAsDataURL(file);
    }
  }


  onClose() {
    this.onCloseModel.emit(false);
  }
  onSubmit(): void {
    if (this.helperForm.valid) {
      const dialogRef = this.dialog.open(HelperSuccessDialogComponent, {
        width: '350px',
        disableClose: true,
        data: { message: 'Helper is added successfully' }
      });
      this.helperService.addHelper(this.helperForm.value).subscribe({
        next: (response) => {
          dialogRef.afterClosed().subscribe(() => {
            this.helperAdded.emit(response.helpers._id);
            this.onClose();
          });
        }
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.docUrl = reader.result;
        const base64String = (reader.result as string).split(',')[1];
        this.helperForm.patchValue({ doc: base64String });
      };
      reader.readAsDataURL(file);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DocumentDialogComponent, {
      data: { flag: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.base64Data) {
        // Add the document to the documents array in the form
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

  nextStep() {
    this.step++;
    this.sharedStepService.setStep(this.step);
  }

  prevStep() {
    this.step--;
    this.sharedStepService.setStep(this.step)
  }
}
