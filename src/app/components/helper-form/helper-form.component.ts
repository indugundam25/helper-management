import { Component, OnInit } from '@angular/core';
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

  ]
})
export class HelperFormComponent implements OnInit {
  
  helperForm!: FormGroup;
  photoUrl: string | ArrayBuffer | null = null;
  
  serviceTypes = ['Cook', 'Driver', 'Maid', 'Lawyer', 'Nurse', 'Plumber'];
  organizations = ['ASBL', 'Spring Helpers'];
  languageOptions = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Urdu'];
  onCloseModel: any;
  
  constructor(private fb: FormBuilder, private helperService : HelperService) {}

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
      email: ['']
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
      // console.log(this.helperForm.value);
      this.helperService.addHelper(this.helperForm.value).subscribe({
        next:(response) => {
          this.onClose();
        }
      })
    }
  }
}
