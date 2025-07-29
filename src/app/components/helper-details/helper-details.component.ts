import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Pencil, Trash, Eye } from 'lucide-angular';
import { KYCDocComponent } from '../kycdoc/kycdoc.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from '../../services/helper.service';
import { RouterLink } from '@angular/router';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-helper-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, KYCDocComponent, DeleteConfirmationComponent, RouterLink],
  templateUrl: './helper-details.component.html',
  styleUrls: ['./helper-details.component.scss']
})
export class HelperDetailsComponent {
  readonly pencil = Pencil;
  readonly trash = Trash;
  readonly eye = Eye;

  selectedHelper: any;
  constructor(private dialog: MatDialog, public helperService: HelperService, private fb: FormBuilder, private toastr: ToastrService) {
    // this.helperService.isEditMode = true;
  };

  getInitials(name: string): string {
    return name ? name.trim().substring(0, 2).toUpperCase() : '';
  }
  trashHelper(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '500px',
      disableClose: true,
      data: {
        name: this.helperService._selectedHelper().name,
        role: this.helperService._selectedHelper().role
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.helperService.deleteHelper(this.helperService._selectedHelper()._id).subscribe({
          next: () => {
            const updatedHelpers = this.helperService._users().filter(
              h => h._id !== this.helperService._selectedHelper()._id
            );
            this.helperService._users.set(updatedHelpers);
            this.helperService._selectedHelper.set(this.helperService._users()[0]);

            this.toastr.error('Helper deleted successfully');
          },
          error: (err) => console.error("Error deleting helper:", err),
        });
      } else {
        dialogRef.close();
      }
    });

  }

  openDoc() {
    if (this.helperService._selectedHelper().documents?.length) {
      const dialogRef = this.dialog.open(KYCDocComponent, {
        width: '600px',
        disableClose: true,
        data: {
          url: this.helperService._selectedHelper().documents[0].url
        }
      });
    } else {
      const dialogRef = this.dialog.open(KYCDocComponent, {
        width: '600px',
        disableClose: true,
      });
    }
  }
}
