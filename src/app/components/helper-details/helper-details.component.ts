import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Pencil, Trash, Eye } from 'lucide-angular';
import { KYCDocComponent } from '../kycdoc/kycdoc.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from '../../services/helper.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-helper-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, KYCDocComponent, DeleteConfirmationComponent],
  templateUrl: './helper-details.component.html',
  styleUrls: ['./helper-details.component.scss']
})
export class HelperDetailsComponent implements OnChanges {
  readonly pencil = Pencil;
  readonly trash = Trash;
  readonly eye = Eye;

  @Input() helper: any;

  selectedHelper: any;

  constructor(private dialog: MatDialog, private helperService: HelperService) { };

  getInitials(name: string): string {
    return name ? name.trim().substring(0, 2).toUpperCase() : '';
  }
  trashHelper(): void {
    console.log("Helper deleted");
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
            console.log("Helper deleted successfully");
            window.location.reload();
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
        width: '800px',
        disableClose: true,
        data: {
          url: this.selectedHelper.documents[0].url
        }
      });
    } else {
      console.error('No document available');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['helper']) {
      this.selectedHelper = this.helper || null;
    }
  }
}
