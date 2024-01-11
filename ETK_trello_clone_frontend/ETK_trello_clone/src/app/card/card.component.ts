import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Column } from '../models/column';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule, FormsModule, NgIf]
})

export class CardComponent {

  @Input() card: Card | undefined;
  @Input() column: Column | undefined;
  @Output() cardDeleted: EventEmitter<Card> = new EventEmitter<Card>();
  @Output() cardEdited: EventEmitter<Card> = new EventEmitter<Card>();

  showEditForm: boolean = false;
  name!: string;
  description!: string;
  owner!: string;
  status!: string;
  selectedCard?: Card;

  constructor(private cardService: CardService,
    public dialog: MatDialog) { }

  toggleEditForm(card: Card): void {
    this.cardEdited.emit(card);
  }

  cancelForm(): void {
    this.showEditForm = false;
  }

  deleteCard(card: Card): void {
    if (card.cardId) {
      this.cardService.deleteCard(card.cardId).subscribe(
        (response: void) => {
          this.cardDeleted.emit(card);
          console.log('Card  is successfully deleted:', response);
        },
        (error) => {
          console.error('Error while deleting card:', error);
        }
      );
    } else {
      console.error('Card is undefined.');
    }
  }
}