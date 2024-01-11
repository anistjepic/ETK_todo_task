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
  @Output() onEditCard = new EventEmitter<boolean>();

  cards: Card[] = [];

  constructor(public dialog: MatDialog,
    private cardService: CardService) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.cardService.getCards(this.column.columnId!).subscribe(
      (response: Card[]) => {
        this.cards = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addCard() {
    const dialogRef = this.dialog.open(CreateCardComponent, {
      data: {
        board: this.board
      }
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

  onCardDeleted(deletedCard: Card): void {
    this.getCards();
  }

  openEditDialog(card: Card): void {
    const dialogRef = this.dialog.open(CreateCardComponent, {
      data: {
        card: card,
        board: this.board
      }
    });
    dialogRef.afterClosed().subscribe((editedCard: Card) => {
      if (editedCard) {
        this.cardService.createCard(editedCard).subscribe(
          (response: Card) => {
            if (response) {
              console.log('Card edited successfully:', response);
              this.getCards();
              this.onEditCard.emit(true);
            } else {
              this.getCards();
            }
          },
          (error) => {
            console.error('Error edited card:', error);
          }
        );
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

  getColumnHeaderClass(): string {
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
