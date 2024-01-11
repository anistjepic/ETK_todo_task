import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../card/card.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { Board } from '../models/board';

@Component({
  selector: 'app-find-board',
  standalone: true,
  imports: [MatButtonModule, CardComponent, NgFor, NgIf, FormsModule],
  templateUrl: './find-board.component.html',
  styleUrl: './find-board.component.css',
})
export class FindBoardComponent {
  @Output() boardCreated = new EventEmitter<Board>();

  boards!: Board[];
  boardName: string = '';
  showCreateForm: boolean = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FindBoardComponent>
  ) { }

  ngOnInit(): void { }

  cancelForm(): void {
    this.dialogRef.close();
  }

  submit(form: FormGroup) {
    this.dialogRef.close(form);
  }
}