import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../card/card.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { Board } from '../models/board';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-create-column',
  standalone: true,
  imports: [MatButtonModule, CardComponent, NgFor, NgIf, FormsModule],
  templateUrl: './create-column.component.html',
  styleUrl: './create-column.component.css',
})
export class CreateCardComponent {
//   @Output() boardCreated = new EventEmitter<Board>();
  
//   boards!: Board[];
//   boardName: string = '';
//   showCreateForm: boolean = false;

//   constructor(
//     private boardService: BoardService,
//     public dialog: MatDialog,
//     public dialogRef: MatDialogRef<CreateBoardComponent>
//   ) { }

//   ngOnInit(): void { }

//   createBoard(formData: any) {
//     const newBoard: Board = {
//       boardName: formData.boardName,
//     };
//     this.boardService.createBoard(newBoard).subscribe(
//       (response: Board) => {
//         console.log('Board created successfully:', response);
//         this.boardCreated.emit(response);
//         this.boardName = '';
//         this.showCreateForm = false;
//       },
//       (error) => {
//         console.error('Error creating board:', error);
//       }
//     );
//   }

//   cancelForm(): void {
//     this.boardName = '';
//     this.showCreateForm = false;
//   }

//   submit(form: FormGroup) {
//     console.log(form);
//     this.dialogRef.close(form);
//   }
}