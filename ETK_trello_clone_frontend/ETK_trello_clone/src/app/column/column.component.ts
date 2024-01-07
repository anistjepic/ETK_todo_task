import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../card/card.component';
import { Column } from '../models/column';
import { MatDialog } from '@angular/material/dialog';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';
import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ColumnService } from '../services/column.service';
import { CreateCardComponent } from '../create-card/create-card.component';
import { Board } from '../models/board';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [MatButtonModule, CardComponent, NgFor, NgIf, FormsModule],
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
    this.status = undefined;
    this.showCreateForm = false;
}

addCard() {
  const dialogRef = this.dialog.open(CreateCardComponent, {
    width: '300px', // Set width as per your requirements
    data: this.board
  });

  dialogRef.afterClosed().subscribe(result => {
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


  createCard(): void {
    const newCard: Card = {
      cardName: this.cardName,
      cardDescription: this.description,
      cardOwner: this.cardOwner,
      status: this.column!.columnStatus,
      column: this.column!
    };

    this.cardService.createCard(newCard).subscribe(
      (response: Card) => {
        this.cards.push(response);
        console.log('Card created successfully:', response);
      },
      (error) => {
        console.error('Error creating card:', error);
      }
    );

    this.cardName = '';
    this.description = '';
    this.cardOwner = '';
    this.status = undefined;
    this.showCreateForm = false;
  }

  onCardDeleted(deletedCard: Card): void {
    this.cards = this.cards.filter(card => card.cardId !== deletedCard.cardId);
  }

  onCardEdited(): void {
    this.getCards();
  }

  deleteColumn(column: Column): void {
    if (column.columnId) {
      this.onDeleteColumn.emit(column);
    } else {
      console.error('Column is undefined.');
    }
  }
}
