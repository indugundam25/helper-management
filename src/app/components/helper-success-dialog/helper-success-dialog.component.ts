import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-helper-success-dialog',
  template: `
    <div class="dialog-content">
     <img src="assets/success.gif" alt="Success Animation" />
      <p>{{data.name}} added</p>
      <a [routerLink]='[""]'>
     <button mat-raised-button color="primary" (click)="close()">OK</button>
     </a>

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
      min-height : 30px;
      border-radius : 5px;
      background-color : #83baeaff;
    }
  `],
  standalone: true,
  imports: [RouterLink]
})
export class HelperSuccessDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<HelperSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) { }


  close() {
    this.dialogRef.close();
  }

} 