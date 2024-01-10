import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../card/card.component';
import { Column } from '../models/column';
import { MatDialog } from '@angular/material/dialog';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ColumnService } from '../services/column.service';
import { CreateCardComponent } from '../create-card/create-card.component';
import { Board } from '../models/board';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [MatButtonModule, CardComponent, NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css'
})

export class ColumnComponent {
  @Input() column!: Column;
  @Input() board!: Board;
  @Output() onDeleteColumn = new EventEmitter<Column>();
  cards: Card[] = [];
  showCreateForm = false;
  cardName!: string;
  description!: string;
  cardOwner!: string;
  status?: string;

  constructor(public dialog: MatDialog,
  private cardService: CardService,
  private columnService: ColumnService,
  ) {}

  ngOnInit(): void {
      this.getCards();
    }
  
  getCards(): void {
    console.log("column id " + this.column.columnId)
    this.cardService.getCards(this.column.columnId!).subscribe(
      (response: Card[]) => {
        this.cards = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  cancelForm(): void {
    this.cardName = '';
    this.description = '';
    this.cardOwner = '';
    this.status = '';
    this.showCreateForm = false;
}

addCard() {
  console.log("addCard");
  const dialogRef = this.dialog.open(CreateCardComponent, {
    data: this.board
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if (result) {
      this.cardService.createCard({
        ...result,
        status: this.column!.columnStatus,
        column: this.column!
      }).subscribe(
        (response: Card) => {
          console.log('Card created successfully:', response);
          this.getCards();
        },
        (error) => {
          console.error('Error creating card:', error);
        }
      );
    }
  });
}
  onCardDeleted(deletedCard: Card): void {
    this.cards = this.cards.filter(card => card.cardId !== deletedCard.cardId);
  }

  onCardEdited(editedCard: Card): void {
    this.updateCard(editedCard);
  }

  updateCard(editedCard: Card) {

  }

  openEditDialog(card: Card): void {

    console.log("openEditDialog: ");
    console.log("card: ", card);
    console.log("column: ", card.column);
    const dialogRef = this.dialog.open(CreateCardComponent, {
      data: { card, board: this.column!.board}
    });
  
    dialogRef.afterClosed().subscribe((editedCard: Card) => {
      if (editedCard) {
        this.onCardEdited(editedCard); // Pass the edited card data to update
      }
    });
  }

  deleteColumn(column: Column): void {
    if (column.columnId) {
      this.onDeleteColumn.emit(column);
    } else {
      console.error('Column is undefined.');
    }
  }

  getColumnHeaderClass(): string{
    switch (this.column?.columnStatus) {
      case 'TO_DO':
        return 'status-to-do';
      case 'IN_PROGRESS':
        return 'status-in-progress';
      case 'DONE':
        return 'status-done';
      default:
        return '';
    }
  }
}
