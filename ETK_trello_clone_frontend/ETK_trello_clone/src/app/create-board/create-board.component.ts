import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../card/card.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { Board } from '../models/board';

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

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateBoardComponent>
  ) { }

  ngOnInit(): void { }

  cancelForm(): void {
    this.dialogRef.close();
  }

  submit(form: FormGroup) {
    this.dialogRef.close(form);
  }
}