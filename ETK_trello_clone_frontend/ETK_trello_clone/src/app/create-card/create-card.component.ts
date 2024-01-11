import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../card/card.component';
import { Column } from '../models/column';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Card } from '../models/card';
import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { ColumnService } from '../services/column.service';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [MatButtonModule, CardComponent, NgFor, NgIf, FormsModule],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css'
})

export class CreateCardComponent {
  @ViewChild('createForm') createCardForm!: NgForm;
  @Input() column?: Column;
  @Output() onDeleteColumn = new EventEmitter<Column>();

  cards: Card[] = [];
  showCreateForm = false;
  cardName!: string;
  cardDescription!: string;
  cardOwner!: string;
  cardStatus!: string;
  columns: Column[] = [];
  cardId: number | undefined;

  constructor(public dialog: MatDialog,
    private columnService: ColumnService,
    public dialogRef: MatDialogRef<CreateCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      board: any,
      card: any
    }
  ) { }

  ngOnInit(): void {
    console.log("create-card", this.column)
    this.getColumns();
    if (this.data.card) {
      this.cardName = this.data.card.cardName,
        this.cardDescription = this.data.card.cardDescription,
        this.cardOwner = this.data.card.cardOwner,
        this.cardStatus = this.data.card.status,
        this.cardId = this.data.card.cardId
    }
  }

  public getColumns(): void {
    this.columnService.getColumns(this.data.board.boardId!).subscribe(
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

  deleteColumn(column: Column): void {
    if (column.columnId) {
      this.onDeleteColumn.emit(column);
    } else {
      console.error('Column is undefined.');
    }
  }

  submit(form: FormGroup) {
    console.log(form);
    this.dialogRef.close({
      ...form,
      cardId: this.cardId
    });
  }
}