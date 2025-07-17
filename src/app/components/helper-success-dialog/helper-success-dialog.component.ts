import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-helper-success-dialog',
  template: `
    <div class="dialog-content">
      <h2>Success!</h2>
      <p>{{ data?.message || 'Helper is added successfully' }}</p>
      <button mat-raised-button color="primary" (click)="close()">OK</button>
    </div>
  `,
  styles: [
    `.dialog-content {
      text-align: center;
      padding: 2rem 2.5rem;
    }
    h2 {
      margin-bottom: 1rem;
      color: #388e3c;
    }
    p {
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
    button {
      min-width: 100px;
    }
  `],
  standalone: true,
  imports: []
})
export class HelperSuccessDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<HelperSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message?: string }
  ) {}
  close() {
    this.dialogRef.close();
  }
} 