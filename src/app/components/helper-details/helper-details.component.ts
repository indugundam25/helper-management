import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Pencil, Trash, Eye } from 'lucide-angular';
import { KYCDocComponent } from '../kycdoc/kycdoc.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'app-helper-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, KYCDocComponent],
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
    // if (!this.selectedHelper || !this.selectedHelper.id) return;
    console.log("Helper deleted");
    this.helperService.deleteHelper(this.selectedHelper._id).subscribe({
      next: () => console.log("Success indu"),
      error: (err) => console.log(err)
    });
    window.location.reload();
  }

  openDoc() {
    const dialogRef = this.dialog.open(KYCDocComponent, {
      width: '350px',
      disableClose: true,
      data: { doc: 'data:application/pdf;base64,' + this.selectedHelper.docUrl }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['helper']) {
      this.selectedHelper = this.helper || null;
    }
  }
}
