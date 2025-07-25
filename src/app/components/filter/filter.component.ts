import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  selectedRoles: string[] = [];
  selectedOrgs: string[] = [];
  roles: string[] = ['Cook', 'Driver', 'Maid', 'Lawyer', 'Nurse', 'Plumber'];
  orgs: string[] = ['ASBL', 'Spring Helpers'];

  constructor(private dialogRef: MatDialogRef<any>) { };

  toggleAll(type: 'service' | 'organization') {
    if (type === 'service') {
      this.selectedRoles =
        this.selectedRoles.length === this.roles.length ? [] : [...this.roles];
    } else {
      this.selectedOrgs =
        this.selectedOrgs.length === this.orgs.length ? [] : [...this.orgs];
    }
  }

  isAllSelected(type: 'service' | 'organization'): boolean {
    return type === 'service'
      ? this.selectedRoles.length === this.roles.length
      : this.selectedOrgs.length === this.orgs.length;
  }


  resetFilters(): void {
    this.selectedRoles = [];
    this.selectedOrgs = [];
    this.dialogRef.close();
  }

  applyFilters(): void {
    console.log('Selected Roles:', this.selectedRoles);
    console.log('Selected Organizations:', this.selectedOrgs);
    this.dialogRef.close();
  }
}
