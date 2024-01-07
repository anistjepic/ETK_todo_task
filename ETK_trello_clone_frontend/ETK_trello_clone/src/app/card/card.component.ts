import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateCardComponent } from '../create-card/create-card.component';
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

  constructor(private cardService: CardService,
    public dialog: MatDialog) { }

  fillInitialValues(card:Card){
    this.name = card.cardName;
    this.description = card.cardDescription;
    this.owner = card.cardOwner;
    this.status = card.status;
  }

  toggleEditForm(card: Card): void {
    const dialogRef = this.dialog.open(CreateCardComponent, {
      width: '300px', // Set width as per your requirements
      data: this.column?.board
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
            // this.getCards();
          },
          (error) => {
            console.error('Error creating card:', error);
          }
        );
      }
    });
  }

  cancelForm(): void {
    this.showEditForm = false;
  }

  editCard(card: Card): void {
    card.cardName = this.name;
    card.cardDescription = this.description;
    card.cardOwner = this.owner;
    card.status = this.status;
    this.cardService.editCard(card).subscribe(
      (response: Card) => {
        this.cardEdited.emit(response);
        console.log('Card is updated successfully:', response);
      },
      (error) => {
        console.error('Error while updating card:', error);
      }
    );
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