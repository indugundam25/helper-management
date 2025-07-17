import { Component, OnInit, Output, EventEmitter} from '@angular/core';
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
    DocumentDialogComponent
  ]
})
export class HelperFormComponent implements OnInit {
  
  helperForm!: FormGroup;
  photoUrl: string | ArrayBuffer | null = null;
  
  serviceTypes = ['Cook', 'Driver', 'Maid', 'Lawyer', 'Nurse', 'Plumber'];
  organizations = ['ASBL', 'Spring Helpers'];
  languageOptions = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Urdu'];
  vehicleTypes = ['None', 'Auto', 'Bike', 'Car'];
  docUrl: string | ArrayBuffer | null = null;
  onCloseModel: any;
  showSuccess = false;
  @Output() helperAdded = new EventEmitter<string>();

  
  
  constructor(private fb: FormBuilder, private helperService : HelperService,
    private dialog: MatDialog) {}

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
    email: [''],
    vehicleType: ['None'],
    doc: [null, Validators.required]
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
      this.helperForm.patchValue({ photo: file });

      const reader = new FileReader();
      reader.onload = () => this.photoUrl = reader.result;
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
            this.helperAdded.emit(response.data._id);
            this.onClose();
          });
        }
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DocumentDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  closeDialog() {
    this.showSuccess = true;
  }
}
