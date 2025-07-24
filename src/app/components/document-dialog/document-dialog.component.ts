import { Component, Inject, Input } from '@angular/core';
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
  flag: boolean = true;
  message: string = '';
  docUrl: string | ArrayBuffer | null = null;

  readonly cloudUpload = CloudUpload;
  readonly x = X;

  @Input() selectedFile: File | undefined;
  selectedDocumentType: string = 'aadhar';

  constructor(
    private dialogRef: MatDialogRef<DocumentDialogComponent>, // ✅ Fix wrong component injected
    @Inject(MAT_DIALOG_DATA) public data: { message?: string }
  ) { }

  onFileSelected(event: Event): void {
    if (!this.flag) return;
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.docUrl = reader.result; // used only for preview
      };
      reader.readAsDataURL(file);
    }
  }

  onDocumentTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedDocumentType = select.value;
  }

  save(): void {
    if (this.selectedFile) {
      this.dialogRef.close({
        documentType: this.selectedDocumentType,
        file: this.selectedFile
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
