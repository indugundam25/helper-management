import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';

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
    MatButtonModule
  ]
})
export class HelperFormComponent {
  // Define all properties used in the template to avoid "does not exist" errors
  serviceTypes = ['Cook', 'Maid', 'Driver', 'Cleaner'];
  organizations = ['Org1', 'Org2'];
  languageOptions = ['English', 'Hindi', 'Telugu'];
  role = '';
  organization = '';
  name = '';
  languages: string[] = [];
  gender = '';
  phone = '';
  email = '';
  photoUrl = '';

  onPhotoChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.photoUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // Your form logic here
    console.log({
      role: this.role,
      organization: this.organization,
      name: this.name,
      languages: this.languages,
      gender: this.gender,
      phone: this.phone,
      email: this.email,
    });
  }
}
