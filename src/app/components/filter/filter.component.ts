import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { FilterService } from '../../services/filters.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  selectedRoles: string[] = [];
  selectedOrgs: string[] = [];
  roles: string[] = ['Cook', 'Driver', 'Maid', 'Lawyer', 'Nurse', 'Plumber'];
  orgs: string[] = ['ASBL', 'Spring Helpers'];
  x = X;
  constructor(private dialogRef: MatDialogRef<any>, private filterService: FilterService, private helperService: HelperService) { };

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
    this.helperService._users.set(this.helperService._dupusers());
  }

  applyFilters(): void {
    this.filterService.filterHelpers(this.selectedRoles, this.selectedOrgs);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
