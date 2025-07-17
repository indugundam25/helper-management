import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HelperSuccessDialogComponent } from '../helper-success-dialog/helper-success-dialog.component';
import { LucideAngularModule, CloudUpload, X } from 'lucide-angular';

@Component({
  selector: 'app-document-dialog',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './document-dialog.component.html',
  styleUrl: './document-dialog.component.scss'
})
export class DocumentDialogComponent {
  message: string = "";
  docUrl: string | ArrayBuffer | null = null;
  readonly cloudUpload = CloudUpload;
  readonly x = X;
  selectedFile: File | undefined;
  constructor(
    private dialogRef: MatDialogRef<HelperSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message?: string }
  ) { }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile.name);
    }
  }


  close() {
    this.dialogRef.close();
  }
}
