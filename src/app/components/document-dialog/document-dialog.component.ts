import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HelperSuccessDialogComponent } from '../helper-success-dialog/helper-success-dialog.component';
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
  message: string = "";
  docUrl: string | ArrayBuffer | null = null;
  readonly cloudUpload = CloudUpload;
  readonly x = X;
  @Input() selectedFile: File | undefined;
  selectedDocumentType: string = 'aadhar';
  base64Data: string | null = null;
  constructor(
    private dialogRef: MatDialogRef<HelperSuccessDialogComponent>,
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
        this.docUrl = reader.result;
        // const base64String = (reader.result as string).split(',')[1];
        // this.helperForm.patchValue({ doc: base64String });
        this.base64Data = (reader.result as string).split(',')[1];

      };
      reader.readAsDataURL(file);
    }
  }

  onDocumentTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedDocumentType = select.value;
  }

  save() {
    if (this.base64Data && this.selectedFile) {
      this.dialogRef.close({
        documentType: this.selectedDocumentType,
        fileName: this.selectedFile.name,
        base64Data: this.base64Data
      });

    }
  }

  close() {
    this.dialogRef.close();
  }
}
