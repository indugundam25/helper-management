import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-dialog',
  standalone: true,
  template: `
    <div class="dialog-container">
      <p class="message">Helper updated</p>
      <button class="close-btn" (click)="closeDialog()">Close</button>
    </div>
  `,
  styles: [
    `.dialog-container { display: flex; flex-direction: column; align-items: center; padding: 20px; font-family: Arial, sans-serif; }
    .message { font-size: 18px; font-weight: 500; margin-bottom: 16px; color: #333; }
    .close-btn { padding: 8px 16px; border: none; background-color: #1976d2; color: white; border-radius: 4px; cursor: pointer; font-size: 14px; transition: background-color 0.3s ease; }
    .close-btn:hover { background-color: #1565c0; }`
  ]
})
export class UpdateDialogComponent {
  constructor(private dialogRef: MatDialogRef<UpdateDialogComponent>, private router: Router) {}
  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
