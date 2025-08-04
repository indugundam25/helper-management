import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, CloudUpload, X, Trash2 } from 'lucide-angular';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'app-document-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './document-dialog.component.html',
  styleUrl: './document-dialog.component.scss'
})
export class DocumentDialogComponent {
  cloudUpload = CloudUpload;
  x = X;
  trash = Trash2;

  selectedFile?: File;
  selectedDocumentType: string = 'aadhar';
  clearFile: boolean = true;
  @Output() fileSelected = new EventEmitter<any>();
  constructor(
    public helperService: HelperService,
    private dialogRef: MatDialogRef<DocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message?: string }
  ) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.clearFile = true;
    }
  }

  clearSelectedFile() {
    this.clearFile = false;
    this.selectedFile = undefined;
  }

  onDocumentTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedDocumentType = select.value;
  }

  save(): void {
    if (this.selectedFile) {
      this.dialogRef.close({
        documentType: this.selectedDocumentType,
        file: this.selectedFile,
        fileName: this.selectedFile.name,
      }); //stores this data when dialogRef.afterClosed() is used.  This data is the result
    }
    else {
      this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}