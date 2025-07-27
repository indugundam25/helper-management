import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class HelperDetailsComponent implements OnChanges {
  readonly pencil = Pencil;
  readonly trash = Trash;
  readonly eye = Eye;

  @Input() helper: any;
  // @Input() helperFormEdit!: FormGroup;
  selectedHelper: any;

  constructor(private dialog: MatDialog, private helperService: HelperService, private fb: FormBuilder, private toastr: ToastrService) { };

  getInitials(name: string): string {
    return name ? name.trim().substring(0, 2).toUpperCase() : '';
  }
  trashHelper(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '500px',
      disableClose: true,
      data: {
        name: this.selectedHelper.name,
        role: this.selectedHelper.role
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.helperService.deleteHelper(this.selectedHelper._id).subscribe({
          next: () => {
            const updatedHelpers = this.helperService._users().filter(
              h => h._id !== this.selectedHelper._id
            );
            this.helperService._users.set(updatedHelpers);

            this.toastr.success('Helper deleted successfully');
          },
          error: (err) => console.error("Error deleting helper:", err),
        });
      } else {
        dialogRef.close();
      }
    });

  }

  openDoc() {
    if (this.selectedHelper.documents?.length) {
      const dialogRef = this.dialog.open(KYCDocComponent, {
        width: '600px',
        disableClose: true,
        data: {
          url: this.selectedHelper.documents[0].url
        }
      });
    } else {
      // console.error('No document available');
      const dialogRef = this.dialog.open(KYCDocComponent, {
        width: '600px',
        disableClose: true,
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['helper']) {
      this.selectedHelper = this.helper || null;
    }
  }
}
