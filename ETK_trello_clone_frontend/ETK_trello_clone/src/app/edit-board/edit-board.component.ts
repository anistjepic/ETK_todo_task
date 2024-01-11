import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-edit-board',
  standalone: true,
  imports: [MatButtonModule, NgFor, NgIf, FormsModule],
  templateUrl: './edit-board.component.html',
  styleUrl: './edit-board.component.css',
})
export class EditBoardComponent {
  boardName: string = '';
  boardNameExists: boolean = false;

  constructor(
    private boardService: BoardService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditBoardComponent>
  ) { }

  ngOnInit(): void { }

  cancelForm(): void {
    this.dialogRef.close();
  }

  submit(formValue: any): void {
    this.boardService.checkIfBoardNameExists(formValue.boardName).subscribe(
      (ifUniqueBoardName: boolean) => {
        if (ifUniqueBoardName) {
          this.dialogRef.close(formValue);
        } else {
          this.boardNameExists = true;
        }
      },
      (error) => {
        console.error('Error checking board name:', error);
      }
    );
  }
}