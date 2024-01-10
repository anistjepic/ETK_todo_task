import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../card/card.component';
import { Column } from '../models/column';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Card } from '../models/card';
import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormsModule } from '@angular/forms';
import { ColumnService } from '../services/column.service';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [MatButtonModule, CardComponent, NgFor, NgIf, FormsModule],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css'
})

export class CreateCardComponent {
  @Input() column?: Column;
  @Output() onDeleteColumn = new EventEmitter<Column>();
  cards: Card[] = [];
  showCreateForm = false;
  cardName!: string;
  cardDescription!: string;
  cardOwner!: string;
  cardStatus!: string;
  columns: Column[] = [];

  constructor(public dialog: MatDialog,
    private columnService: ColumnService,
    public dialogRef: MatDialogRef<CreateCardComponent>,
    @Inject(MAT_DIALOG_DATA) public board: any
  ) { }

  ngOnInit(): void {
    console.log("create-card", this.column)
    this.getColumns();
  }

  public getColumns(): void {
    this.columnService.getColumns(this.board.boardId!).subscribe(
      (response: Column[]) => {
        this.columns = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  cancelForm(): void {
    this.cardName = '';
    this.cardDescription = '';
    this.cardOwner = '';
    this.cardStatus = '';
    this.showCreateForm = false;

    this.dialogRef.close();
  }

  createCard(formData: any): void {
    this.resetForm();
  }

  resetForm() {
    this.cardName = '';
    this.cardDescription = '';
    this.cardOwner = '';
    this.cardStatus = '';
    this.showCreateForm = false;
  }

  onCardDeleted(deletedCard: Card): void {
    this.cards = this.cards.filter(card => card.cardId !== deletedCard.cardId);
  }

  onCardEdited(): void {
  }

  deleteColumn(column: Column): void {
    if (column.columnId) {
      this.onDeleteColumn.emit(column);
    } else {
      console.error('Column is undefined.');
    }
  }

  submit(form: FormGroup) {
    console.log(form);
    this.dialogRef.close(form);
  }
}