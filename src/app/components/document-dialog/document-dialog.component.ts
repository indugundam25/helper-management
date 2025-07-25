import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, CloudUpload, X } from 'lucide-angular';

@Component({
  selector: 'app-document-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './document-dialog.component.html',
  styleUrl: './document-dialog.component.scss'
})
export class DocumentDialogComponent {
  readonly cloudUpload = CloudUpload;
  readonly x = X;

  selectedFile?: File;
  selectedDocumentType: string = 'aadhar';
  previewUrl: string | ArrayBuffer | null = null;
  @Output() fileSelected = new EventEmitter<any>();
  constructor(
    private dialogRef: MatDialogRef<DocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message?: string }
  ) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onDocumentTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedDocumentType = select.value;
  }

  sendFile(filename: string) {
    this.fileSelected.emit(filename);
  }
  save(): void {
    if (this.selectedFile) {
      this.dialogRef.close({
        documentType: this.selectedDocumentType,
        file: this.selectedFile,
        fileName: this.selectedFile.name,
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}