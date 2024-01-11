import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-board',
  standalone: true,
  imports: [MatButtonModule, NgFor, NgIf, FormsModule],
  templateUrl: './edit-board.component.html',
  styleUrl: './edit-board.component.css',
})
export class EditBoardComponent {  
  boardName: string = '';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditBoardComponent>
  ) { }

  ngOnInit(): void { }

  cancelForm(): void {
    this.dialogRef.close();
  }

  submit(form: FormGroup) {
    this.dialogRef.close(form);
  }
}