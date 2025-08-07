import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { FilterService } from '../../services/filters.service';
import { HelperService } from '../../services/helper.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatSelectModule, MatCheckboxModule, MatFormFieldModule, CommonModule, FormsModule, LucideAngularModule],
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


  isAllSelected(type: 'service' | 'organization'): boolean {
    const list = type === 'service' ? this.roles : this.orgs;
    const selected = type === 'service' ? this.selectedRoles : this.selectedOrgs;
    return selected.length === list.length && list.length > 0;
  }

  isIndeterminate(type: 'service' | 'organization'): boolean {
    const list = type === 'service' ? this.roles : this.orgs;
    const selected = type === 'service' ? this.selectedRoles : this.selectedOrgs;
    return selected.length > 0 && selected.length < list.length;
  }

  toggleAll(type: 'service' | 'organization', event: any): void {
    const list = type === 'service' ? this.roles : this.orgs;
    if (event.checked) {
      if (type === 'service') {
        this.selectedRoles = [...list];
      } else {
        this.selectedOrgs = [...list];
      }
    } else {
      if (type === 'service') {
        this.selectedRoles = [];
      } else {
        this.selectedOrgs = [];
      }
    }
  }

  resetFilters(): void {
    this.selectedRoles = [];
    this.selectedOrgs = [];
    this.dialogRef.close();
    this.helperService._users.set(this.helperService._dupusers());
    this.helperService.onSelecthelper(this.helperService._users()[0]);

  }

  applyFilters(): void {
    this.filterService.filterHelpers(this.selectedRoles, this.selectedOrgs);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
