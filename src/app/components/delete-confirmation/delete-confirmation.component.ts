import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, Trash2, X } from 'lucide-angular';
@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss'
})
export class DeleteConfirmationComponent implements OnInit {

  trash = Trash2;
  x = X;
  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("Hello")
  }
  closeClick() {
    this.dialogRef.close(false);
  }
  deleteClick() {
    this.dialogRef.close(true);
  }
}
