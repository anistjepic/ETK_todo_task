import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../card/card.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Board } from '../models/board';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [MatButtonModule, CardComponent, NgFor, NgIf, FormsModule],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.css',
})
export class CreateBoardComponent {
  @Output() boardCreated = new EventEmitter<Board>();

  boards!: Board[];
  boardName: string = '';
  boardNameExists: boolean = false;

  constructor(
    private boardService: BoardService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateBoardComponent>
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